from pymongo import MongoClient
import datetime  # ✅ Required for datetime.datetime

client = MongoClient("mongodb://localhost:27017/")
db = client.ncc_db
fsfs_achievements = db.fsfs_achievements

# Insert a news item
db.latest_news.insert_one({
    "title": "Summer Internship Offer for all ncc cadets ",
    "link": "https://nccsite.com/news/internship2025",
    "date": datetime.datetime(2025, 7, 11)
})
