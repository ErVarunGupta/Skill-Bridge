from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()
# MONGO_URI = os.getenv("MONGO_URI") 
# print("MONGO_URI =", os.getenv("MONGO_URI")) 
# MONGO_URI = "mongodb+srv://varungupta0994_db_user:RzIF3qalJMgYyVvU@skill-bridge.axuwwxg.mongodb.net/SkillBridge?retryWrites=true&w=majority&appName=skill-bridge" 
MONGO_URI = os.getenv("MONGO_URI") 
DB_NAME = "SkillBridge"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

users_col = db["users"]
profiles_col = db["profiles"]
