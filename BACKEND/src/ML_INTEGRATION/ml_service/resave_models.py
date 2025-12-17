import joblib
import pandas as pd
from feature_pipeline import build_ranking_features

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
rank_model = joblib.load("profile_ranking_model.pkl")
tfidf = joblib.load("tfidf_profile_vectorizer.pkl")

# Force sklearn objects to initialize
X = build_ranking_features(df)
_ = rank_model.predict(X)
_ = tfidf.transform(df["profile_text"])

# Re-save (same filenames)
joblib.dump(rank_model, "profile_ranking_model.pkl")
joblib.dump(tfidf, "tfidf_profile_vectorizer.pkl")

print("✅ Models re-saved successfully")
