from fastapi import FastAPI
import joblib
import pandas as pd
import numpy as np
from functools import lru_cache
from sklearn.metrics.pairwise import cosine_similarity

from ML_INTEGRATION.ml_service.mongo_loader import load_profiles_df

from feature_pipeline import build_ranking_features
from huggingface_hub import hf_hub_download

app = FastAPI(title="SkillBridge ML Service")

# Get model from Hugging face---------------------------------------


MODEL_REPO = "varungupta0994/skillbridge-ml-models"

profile_ranking = hf_hub_download(
    repo_id=MODEL_REPO,
    filename="profile_ranking_model.pkl"
)

tfidf_vectorizer = hf_hub_download(
    repo_id=MODEL_REPO,
    filename="tfidf_profile_vectorizer.pkl"
)

rank_model = joblib.load(profile_ranking)
tfidf = joblib.load(tfidf_vectorizer)
# --------------------------------------------------------

# Load ML models once
# rank_model = joblib.load("profile_ranking_model.pkl")
# tfidf = joblib.load("tfidf_profile_vectorizer.pkl")


def clean_for_json(df: pd.DataFrame) -> pd.DataFrame:
    df = df.replace([np.inf, -np.inf], np.nan)

    # numeric columns
    for col in ["averageRating", "totalReviews", "mlScore"]:
        if col in df.columns:
            df[col] = df[col].fillna(0)

    # list columns (IMPORTANT FIX)
    for col in ["comments", "threads", "skills"]:
        if col in df.columns:
            df[col] = df[col].apply(lambda x: x if isinstance(x, list) else [])

    # string columns
    df = df.fillna("")

    return df



@lru_cache(maxsize=1)
def get_df():
    df = load_profiles_df()

    df["profile_text"] = (
        df["skills"].astype(str) + " " +
        df["bio"].astype(str) + " " +
        df["education"].astype(str) + " " +
        df["currentPost"].astype(str) + " " +
        df["pastWork"].astype(str)
    )

    return df


@app.get("/users/top")
def top_users(limit: int = 10):
    df = get_df().copy()

    X = build_ranking_features(df)
    df["mlScore"] = rank_model.predict(X)
    df["rank"] = df["mlScore"].rank(ascending=False, method="dense")

    df = clean_for_json(df)

    cols = [
        "userId", "name", "email", "username",
        "skills", "profilePicture", "bio",
        "averageRating", "currentPost", "pastWork",
        "education", "totalReviews",
        "comments", "threads",
        "mlScore", "rank"
    ]

    return (
        df.sort_values("mlScore", ascending=False)
          .head(limit)[cols]
          .to_dict(orient="records")
    )


@app.get("/recommend/search")
def recommend(user_index: int, limit: int = 10, alpha: float = 0.6):
    df = get_df().copy()

    if user_index < 0 or user_index >= len(df):
        return {"error": "Invalid user index"}

    tfidf_matrix = tfidf.transform(df["profile_text"])

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

    result_df = clean_for_json(df.iloc[top_idx])

    cols = [
        "userId", "name", "skills", "email", "username",
        "profilePicture", "bio", "averageRating",
        "currentPost", "pastWork", "education",
        "totalReviews", "comments", "threads"
    ]

    return result_df[cols].to_dict(orient="records")
