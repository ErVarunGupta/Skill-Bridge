# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:16:09.312764Z","iopub.execute_input":"2025-12-15T19:16:09.313101Z","iopub.status.idle":"2025-12-15T19:16:09.320849Z","shell.execute_reply.started":"2025-12-15T19:16:09.313076Z","shell.execute_reply":"2025-12-15T19:16:09.319910Z"}}

import numpy as np 
import pandas as pd 
from datetime import datetime

# import os
# for dirname, _, filenames in os.walk('/kaggle/input'):
#     for filename in filenames:
#         print(os.path.join(dirname, filename))


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:27:49.450839Z","iopub.execute_input":"2025-12-15T19:27:49.451173Z","iopub.status.idle":"2025-12-15T19:27:50.024551Z","shell.execute_reply.started":"2025-12-15T19:27:49.451150Z","shell.execute_reply":"2025-12-15T19:27:50.023615Z"}}
df = pd.read_csv('training_data.csv')
df.head()

# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:28:46.783016Z","iopub.execute_input":"2025-12-15T19:28:46.783398Z","iopub.status.idle":"2025-12-15T19:28:46.791844Z","shell.execute_reply.started":"2025-12-15T19:28:46.783368Z","shell.execute_reply":"2025-12-15T19:28:46.790731Z"}}
df.columns

# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:32:50.796796Z","iopub.execute_input":"2025-12-15T19:32:50.798238Z","iopub.status.idle":"2025-12-15T19:32:50.929196Z","shell.execute_reply.started":"2025-12-15T19:32:50.798200Z","shell.execute_reply":"2025-12-15T19:32:50.928209Z"}}
# ---------------------------
# BASIC CLEANING
# ---------------------------
df["bio"] = df["bio"].fillna("")
df["skills"] = df["skills"].fillna("[]")
df["comments"] = df["comments"].fillna("[]")
df["threads"] = df["threads"].fillna("[]")

# ---------------------------
# FEATURE ENGINEERING
# ---------------------------

# 1. Profile picture
df["has_profile_pic"] = (df["profilePicture"] != "default.jpg").astype(int)

# 2. Bio length
df["bio_length"] = df["bio"].apply(len)

# 3. Number of skills
df["num_skills"] = df["skills"].apply(lambda x: len(x) if isinstance(x, list) else 0)

# 4. Current post
df["has_current_post"] = df["currentPost"].notna().astype(int)

# 5. Past work
df["has_past_work"] = df["pastWork"].notna().astype(int)

# 6. Education level (simple mapping)
def edu_score(x):
    if not isinstance(x, str):
        return 0
    x = x.lower()
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

# 7. Number of comments
df["num_comments"] = df["comments"].apply(lambda x: len(x) if isinstance(x, list) else 0)

# 8. Number of threads
df["num_threads"] = df["threads"].apply(lambda x: len(x) if isinstance(x, list) else 0)

# 9. Account age (days)
df["createdAt"] = pd.to_datetime(df["createdAt"], errors="coerce")
df["account_age_days"] = (pd.Timestamp.now() - df["createdAt"]).dt.days.fillna(0)

# ---------------------------
# FINAL ML DATAFRAME
# ---------------------------
ml_features = df[
    [
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
        "averageRating"
    ]
]

ml_features.head()


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:35:08.533473Z","iopub.execute_input":"2025-12-15T19:35:08.533905Z","iopub.status.idle":"2025-12-15T19:35:09.211085Z","shell.execute_reply.started":"2025-12-15T19:35:08.533875Z","shell.execute_reply":"2025-12-15T19:35:09.210266Z"}}
from sklearn.preprocessing import MinMaxScaler

df_ml = ml_features.copy()

# ---------------------------
# NORMALIZE IMPORTANT FIELDS
# ---------------------------
scaler = MinMaxScaler()

df_ml[["averageRating", "totalReviews", "num_skills", "num_threads"]] = scaler.fit_transform(
    df_ml[["averageRating", "totalReviews", "num_skills", "num_threads"]]
)

# ---------------------------
# PROFILE COMPLETENESS SCORE
# ---------------------------
df_ml["profile_complete_score"] = (
    df_ml["has_profile_pic"] +
    (df_ml["bio_length"] > 30).astype(int) +
    (df_ml["num_skills"] > 0).astype(int) +
    df_ml["has_current_post"] +
    df_ml["has_past_work"]
) / 5  # normalize 0–1

# ---------------------------
# FINAL TARGET SCORE (y)
# ---------------------------
df_ml["profile_quality_score"] = (
    0.40 * df_ml["averageRating"] +
    0.20 * df_ml["totalReviews"] +
    0.15 * df_ml["num_skills"] +
    0.15 * df_ml["num_threads"] +
    0.10 * df_ml["profile_complete_score"]
) * 100   # scale to 0–100

df_ml[["profile_quality_score"]].head()


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:35:22.763938Z","iopub.execute_input":"2025-12-15T19:35:22.764387Z","iopub.status.idle":"2025-12-15T19:35:22.771494Z","shell.execute_reply.started":"2025-12-15T19:35:22.764361Z","shell.execute_reply":"2025-12-15T19:35:22.770649Z"}}
X = df_ml.drop(columns=["profile_quality_score"])


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:35:32.072938Z","iopub.execute_input":"2025-12-15T19:35:32.073227Z","iopub.status.idle":"2025-12-15T19:35:32.077978Z","shell.execute_reply.started":"2025-12-15T19:35:32.073207Z","shell.execute_reply":"2025-12-15T19:35:32.076912Z"}}
y = df_ml["profile_quality_score"]


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:35:47.244186Z","iopub.execute_input":"2025-12-15T19:35:47.244672Z","iopub.status.idle":"2025-12-15T19:35:47.260917Z","shell.execute_reply.started":"2025-12-15T19:35:47.244645Z","shell.execute_reply":"2025-12-15T19:35:47.259535Z"}}
y.describe()


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:36:18.195013Z","iopub.execute_input":"2025-12-15T19:36:18.195371Z","iopub.status.idle":"2025-12-15T19:36:18.391997Z","shell.execute_reply.started":"2025-12-15T19:36:18.195345Z","shell.execute_reply":"2025-12-15T19:36:18.390852Z"}}
final_ml_data = X.copy()
final_ml_data["target"] = y

final_ml_data.to_csv("profile_ranking_ml_data.csv", index=False)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:37:08.432099Z","iopub.execute_input":"2025-12-15T19:37:08.432460Z","iopub.status.idle":"2025-12-15T19:37:08.575601Z","shell.execute_reply.started":"2025-12-15T19:37:08.432432Z","shell.execute_reply":"2025-12-15T19:37:08.574606Z"}}
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

print(X_train.shape, X_test.shape)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:37:22.002931Z","iopub.execute_input":"2025-12-15T19:37:22.003227Z","iopub.status.idle":"2025-12-15T19:37:26.709261Z","shell.execute_reply.started":"2025-12-15T19:37:22.003207Z","shell.execute_reply":"2025-12-15T19:37:26.708276Z"}}
from sklearn.ensemble import RandomForestRegressor

rf_model = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    random_state=42,
    n_jobs=-1
)

rf_model.fit(X_train, y_train)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:37:38.042909Z","iopub.execute_input":"2025-12-15T19:37:38.043241Z","iopub.status.idle":"2025-12-15T19:37:38.214433Z","shell.execute_reply.started":"2025-12-15T19:37:38.043216Z","shell.execute_reply":"2025-12-15T19:37:38.213436Z"}}
from sklearn.metrics import mean_absolute_error, r2_score

y_pred = rf_model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("MAE:", mae)
print("R2 Score:", r2)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:38:33.009322Z","iopub.execute_input":"2025-12-15T19:38:33.009764Z","iopub.status.idle":"2025-12-15T19:38:33.113490Z","shell.execute_reply.started":"2025-12-15T19:38:33.009736Z","shell.execute_reply":"2025-12-15T19:38:33.112472Z"}}


importance_df = pd.DataFrame({
    "feature": X.columns,
    "importance": rf_model.feature_importances_
}).sort_values(by="importance", ascending=False)

importance_df


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:38:59.729490Z","iopub.execute_input":"2025-12-15T19:38:59.729859Z","iopub.status.idle":"2025-12-15T19:39:00.189548Z","shell.execute_reply.started":"2025-12-15T19:38:59.729836Z","shell.execute_reply":"2025-12-15T19:39:00.188497Z"}}
df["mlScore"] = rf_model.predict(X)


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:39:08.303257Z","iopub.execute_input":"2025-12-15T19:39:08.303660Z","iopub.status.idle":"2025-12-15T19:39:08.316569Z","shell.execute_reply.started":"2025-12-15T19:39:08.303631Z","shell.execute_reply":"2025-12-15T19:39:08.315516Z"}}
df["rank"] = df["mlScore"].rank(ascending=False, method="dense")


# %% [code] {"execution":{"iopub.status.busy":"2025-12-15T19:39:26.983636Z","iopub.execute_input":"2025-12-15T19:39:26.983962Z","iopub.status.idle":"2025-12-15T19:39:27.243116Z","shell.execute_reply.started":"2025-12-15T19:39:26.983938Z","shell.execute_reply":"2025-12-15T19:39:27.242081Z"}}
import joblib

joblib.dump(rf_model, "profile_ranking_model.pkl")
