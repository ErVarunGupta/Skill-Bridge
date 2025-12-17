from fastapi import FastAPI, Query
import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from feature_pipeline import build_ranking_features

app = FastAPI(title="SkillBridge ML Service")

# Load once
df = pd.read_csv("inference_data.csv")
rank_model = joblib.load("profile_ranking_model.pkl")
tfidf = joblib.load("tfidf_profile_vectorizer.pkl")

df["profile_text"] = (
    df["skills"].astype(str) + " " +
    df["bio"].astype(str) + " " +
    df["education"].astype(str) + " " +
    df["currentPost"].astype(str) + " " +
    df["pastWork"].astype(str)
)

tfidf_matrix = tfidf.transform(df["profile_text"])


@app.get("/users/top")
def top_users(limit: int = 10):
    X = build_ranking_features(df)
    df["mlScore"] = rank_model.predict(X)
    df["rank"] = df["mlScore"].rank(ascending=False, method="dense")

    result = (
        df.sort_values("mlScore", ascending=False)
        .head(limit)
        [['userId', "name","email", "username", "skills",'profilePicture','bio', "averageRating", 'currentPost', 'pastWork',
       'education', 'totalReviews', 'averageRating', 'comments', 'threads',"mlScore", "rank"]]
    )

    return result.to_dict(orient="records")


@app.get("/recommend/search")
def recommend(
    user_index: int,
    limit: int = 10,
    alpha: float = 0.6
):
    sim = cosine_similarity(
        tfidf_matrix[user_index],
        tfidf_matrix
    ).flatten()

    X = build_ranking_features(df)
    ml_scores = rank_model.predict(X)
    ml_norm = (ml_scores - ml_scores.min()) / (ml_scores.max() - ml_scores.min() + 1e-8)

    final_score = alpha * sim + (1 - alpha) * ml_norm
    final_score[user_index] = -1

    top_idx = np.argsort(final_score)[::-1][:limit]

    return df.iloc[top_idx][
        ['userId', "name", "skills","email", "username",'profilePicture','bio', "averageRating", 'currentPost', 'pastWork',
       'education', 'totalReviews', 'averageRating', 'comments', 'threads']
    ].to_dict(orient="records")
