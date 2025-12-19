import pandas as pd
from db import users_col, profiles_col

def load_profiles_df():
    users = list(users_col.find({}))
    profiles = list(profiles_col.find({}))

    if not users:
        raise RuntimeError("Users collection is EMPTY or not connected")
    if not profiles:
        raise RuntimeError("Profiles collection is EMPTY or not connected")

    users_df = pd.DataFrame(users)
    profiles_df = pd.DataFrame(profiles)

    users_df["_id"] = users_df["_id"].astype(str)
    profiles_df["userId"] = profiles_df["userId"].astype(str)

    users_df.rename(columns={"_id": "userId"}, inplace=True)

    df = users_df.merge(profiles_df, on="userId", how="inner")

    return df
