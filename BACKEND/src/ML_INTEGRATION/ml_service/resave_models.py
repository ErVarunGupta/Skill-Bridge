import joblib
import pandas as pd
from feature_pipeline import build_ranking_features
from huggingface_hub import hf_hub_download

# Load inference data
df = pd.read_csv("inference_data.csv")

# 🔧 CREATE profile_text (MISSING STEP)
df["profile_text"] = (
    df["skills"].astype(str) + " " +
    df["bio"].astype(str) + " " +
    df["education"].astype(str) + " " +
    df["currentPost"].astype(str) + " " +
    df["pastWork"].astype(str)
)

# Load models
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
# rank_model = joblib.load("profile_ranking_model.pkl")
# tfidf = joblib.load("tfidf_profile_vectorizer.pkl")

# Force sklearn objects to initialize
X = build_ranking_features(df)
_ = rank_model.predict(X)
_ = tfidf.transform(df["profile_text"])

# Re-save (same filenames)
joblib.dump(rank_model, "profile_ranking_model.pkl")
joblib.dump(tfidf, "tfidf_profile_vectorizer.pkl")

print("✅ Models re-saved successfully")
