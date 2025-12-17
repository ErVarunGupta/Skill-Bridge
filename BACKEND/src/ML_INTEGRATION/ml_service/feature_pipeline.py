import pandas as pd

def build_ranking_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["bio"] = df["bio"].fillna("")
    df["skills"] = df["skills"].fillna("[]")
    df["comments"] = df["comments"].fillna("[]")
    df["threads"] = df["threads"].fillna("[]")
    df["education"] = df["education"].fillna("")
    df["currentPost"] = df["currentPost"].fillna("")
    df["pastWork"] = df["pastWork"].fillna("")

    df["has_profile_pic"] = (df["profilePicture"] != "default.jpg").astype(int)
    df["bio_length"] = df["bio"].apply(len)
    df["num_skills"] = df["skills"].apply(lambda x: len(x) if isinstance(x, list) else 0)
    df["has_current_post"] = df["currentPost"].ne("").astype(int)
    df["has_past_work"] = df["pastWork"].ne("").astype(int)

    def edu_score(x):
        x = str(x).lower()
        if "phd" in x: return 4
        if "master" in x: return 3
        if "bachelor" in x or "b.tech" in x: return 2
        if "diploma" in x: return 1
        return 0

    df["education_level"] = df["education"].apply(edu_score)
    df["num_comments"] = df["comments"].apply(lambda x: len(x) if isinstance(x, list) else 0)
    df["num_threads"] = df["threads"].apply(lambda x: len(x) if isinstance(x, list) else 0)

    df["createdAt"] = pd.to_datetime(df["createdAt"], errors="coerce")
    df["account_age_days"] = (
        pd.Timestamp.now() - df["createdAt"]
    ).dt.days.fillna(0)

    df["totalReviews"] = df["totalReviews"].fillna(0)
    df["averageRating"] = df["averageRating"].fillna(0)

    df["profile_complete_score"] = (
        df["has_profile_pic"] +
        (df["bio_length"] > 30).astype(int) +
        (df["num_skills"] > 0).astype(int) +
        df["has_current_post"] +
        df["has_past_work"]
    ) / 5

    return df[
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
            "averageRating",
            "profile_complete_score",
        ]
    ]
