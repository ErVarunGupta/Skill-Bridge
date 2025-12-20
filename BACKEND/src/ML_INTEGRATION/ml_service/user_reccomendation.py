# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:54:11.435677Z","iopub.execute_input":"2025-12-15T19:54:11.436045Z","iopub.status.idle":"2025-12-15T19:54:13.930893Z","shell.execute_reply.started":"2025-12-15T19:54:11.436009Z","shell.execute_reply":"2025-12-15T19:54:13.929266Z"}}

import numpy as np 
import pandas as pd


# import os
# for dirname, _, filenames in os.walk('/kaggle/input'):
#     for filename in filenames:
#         print(os.path.join(dirname, filename))


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:54:13.933037Z","iopub.execute_input":"2025-12-15T19:54:13.934015Z","iopub.status.idle":"2025-12-15T19:54:14.923860Z","shell.execute_reply.started":"2025-12-15T19:54:13.933979Z","shell.execute_reply":"2025-12-15T19:54:14.922941Z"}}
df = pd.read_csv('training_data.csv')
df.head()

# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:56:50.645439Z","iopub.execute_input":"2025-12-15T19:56:50.645789Z","iopub.status.idle":"2025-12-15T19:56:50.721245Z","shell.execute_reply.started":"2025-12-15T19:56:50.645765Z","shell.execute_reply":"2025-12-15T19:56:50.719935Z"}}
df_rec = df.copy()

# ---------------------------
# BASIC CLEANING
# ---------------------------
df_rec["bio"] = df_rec["bio"].fillna("")
df_rec["education"] = df_rec["education"].fillna("")
df_rec["currentPost"] = df_rec["currentPost"].fillna("")
df_rec["pastWork"] = df_rec["pastWork"].fillna("")
df_rec["skills"] = df_rec["skills"].apply(
    lambda x: " ".join(x) if isinstance(x, list) else ""
)

# ---------------------------
# COMBINE TEXT FEATURES
# ---------------------------
df_rec["profile_text"] = (
    df_rec["skills"] + " " +
    df_rec["bio"] + " " +
    df_rec["education"] + " " +
    df_rec["currentPost"] + " " +
    df_rec["pastWork"]
)

df_rec["profile_text"].head()

# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:57:26.947138Z","iopub.execute_input":"2025-12-15T19:57:26.948489Z","iopub.status.idle":"2025-12-15T19:57:26.955165Z","shell.execute_reply.started":"2025-12-15T19:57:26.948452Z","shell.execute_reply":"2025-12-15T19:57:26.953699Z"}}
print(df_rec["profile_text"].iloc[0])


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:58:13.176335Z","iopub.execute_input":"2025-12-15T19:58:13.176669Z","iopub.status.idle":"2025-12-15T19:58:15.008090Z","shell.execute_reply.started":"2025-12-15T19:58:13.176635Z","shell.execute_reply":"2025-12-15T19:58:15.007162Z"}}
from sklearn.feature_extraction.text import TfidfVectorizer

# ---------------------------
# TF-IDF MODEL
# ---------------------------
tfidf = TfidfVectorizer(
    max_features=5000,
    stop_words="english",
    ngram_range=(1, 2)
)

tfidf_matrix = tfidf.fit_transform(df_rec["profile_text"])

tfidf_matrix.shape


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:59:30.777319Z","iopub.execute_input":"2025-12-15T19:59:30.778359Z","iopub.status.idle":"2025-12-15T19:59:30.784572Z","shell.execute_reply.started":"2025-12-15T19:59:30.778327Z","shell.execute_reply":"2025-12-15T19:59:30.783594Z"}}
# check a few feature names
tfidf.get_feature_names_out()[:20]


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:59:48.924559Z","iopub.execute_input":"2025-12-15T19:59:48.924998Z","iopub.status.idle":"2025-12-15T19:59:48.937662Z","shell.execute_reply.started":"2025-12-15T19:59:48.924904Z","shell.execute_reply":"2025-12-15T19:59:48.936358Z"}}
import joblib

joblib.dump(tfidf, "tfidf_profile_vectorizer.pkl")


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T20:05:14.426357Z","iopub.execute_input":"2025-12-15T20:05:14.427365Z","iopub.status.idle":"2025-12-15T20:05:16.424427Z","shell.execute_reply.started":"2025-12-15T20:05:14.427324Z","shell.execute_reply":"2025-12-15T20:05:16.423257Z"}}
import joblib

rank_model = joblib.load("profile_ranking_model.pkl")


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T20:10:53.950435Z","iopub.execute_input":"2025-12-15T20:10:53.950774Z","iopub.status.idle":"2025-12-15T20:10:54.091876Z","shell.execute_reply.started":"2025-12-15T20:10:53.950749Z","shell.execute_reply":"2025-12-15T20:10:54.090778Z"}}

import pandas as pd

def build_ranking_features(df):
    df = df.copy()

    # -------------------------
    # Fill NA
    # -------------------------
    df["bio"] = df["bio"].fillna("")
    df["skills"] = df["skills"].fillna("[]")
    df["comments"] = df["comments"].fillna("[]")
    df["threads"] = df["threads"].fillna("[]")
    df["education"] = df["education"].fillna("")
    df["currentPost"] = df["currentPost"].fillna("")
    df["pastWork"] = df["pastWork"].fillna("")

    # -------------------------
    # Feature Engineering
    # -------------------------
    df["has_profile_pic"] = (df["profilePicture"] != "default.jpg").astype(int)
    df["bio_length"] = df["bio"].apply(len)
    df["num_skills"] = df["skills"].apply(lambda x: len(x) if isinstance(x, list) else 0)

    df["has_current_post"] = df["currentPost"].ne("").astype(int)
    df["has_past_work"] = df["pastWork"].ne("").astype(int)

    # education score
    def edu_score(x):
        x = str(x).lower()
        if "phd" in x:
            return 4
        if "master" in x:
            return 3
        if "bachelor" in x or "b.tech" in x:
            return 2
        if "diploma" in x:
            return 1
        return 0

    df["education_level"] = df["education"].apply(edu_score)

    df["num_comments"] = df["comments"].apply(lambda x: len(x) if isinstance(x, list) else 0)
    df["num_threads"] = df["threads"].apply(lambda x: len(x) if isinstance(x, list) else 0)

    # account age
    df["createdAt"] = pd.to_datetime(df["createdAt"], errors="coerce")
    df["account_age_days"] = (
        pd.Timestamp.now() - df["createdAt"]
    ).dt.days.fillna(0)

    # numeric
    df["totalReviews"] = df["totalReviews"].fillna(0)
    df["averageRating"] = df["averageRating"].fillna(0)

    # -------------------------
    # 🔴 MISSING FEATURE (FIX)
    # -------------------------
    df["profile_complete_score"] = (
        df["has_profile_pic"] +
        (df["bio_length"] > 30).astype(int) +
        (df["num_skills"] > 0).astype(int) +
        df["has_current_post"] +
        df["has_past_work"]
    ) / 5

    feature_cols = [
        "has_profile_pic",
        "bio_length",
        "num_skills",
        "has_current_post",
        "has_past_work",
        "education_level",
        "num_comments",
        "num_threads",
        "account_age_days",
        "totalReviews",
        "averageRating",
        "profile_complete_score"
    ]

    return df[feature_cols]


X_rank = build_ranking_features(df)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T20:10:55.068672Z","iopub.execute_input":"2025-12-15T20:10:55.068990Z","iopub.status.idle":"2025-12-15T20:10:55.280890Z","shell.execute_reply.started":"2025-12-15T20:10:55.068960Z","shell.execute_reply":"2025-12-15T20:10:55.279924Z"}}
df["mlScore"] = rank_model.predict(X_rank)

df[["mlScore"]].head()


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T20:11:01.608452Z","iopub.execute_input":"2025-12-15T20:11:01.609034Z","iopub.status.idle":"2025-12-15T20:11:01.616867Z","shell.execute_reply.started":"2025-12-15T20:11:01.608996Z","shell.execute_reply":"2025-12-15T20:11:01.615465Z"}}
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def recommend_users(
    user_index,
    tfidf_matrix,
    df,
    top_n=10,
    alpha=0.6
):
    """
    alpha = weight for similarity
    (1-alpha) = weight for mlScore
    """

    # 1. Similarity between target user & all users
    sim_scores = cosine_similarity(
        tfidf_matrix[user_index],
        tfidf_matrix
    ).flatten()

    # 2. Normalize mlScore (0–1)
    ml_scores = df["mlScore"].values
    ml_scores_norm = (ml_scores - ml_scores.min()) / (
        ml_scores.max() - ml_scores.min() + 1e-8
    )

    # 3. Final hybrid score
    final_score = alpha * sim_scores + (1 - alpha) * ml_scores_norm

    # 4. Remove self
    final_score[user_index] = -1

    # 5. Top-N users
    top_indices = np.argsort(final_score)[::-1][:top_n]

    return df.iloc[top_indices][
        ["name", "skills", "averageRating", "mlScore"]
    ]


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T20:11:09.212865Z","iopub.execute_input":"2025-12-15T20:11:09.213244Z","iopub.status.idle":"2025-12-15T20:11:09.273701Z","shell.execute_reply.started":"2025-12-15T20:11:09.213216Z","shell.execute_reply":"2025-12-15T20:11:09.272732Z"}}
# Example: recommend for user at index 5
recommend_users(
    user_index=5,
    tfidf_matrix=tfidf_matrix,
    df=df,
    top_n=10
)


# %% [code]
