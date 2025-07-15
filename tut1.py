from flask import Flask, render_template, request, redirect
from pymongo import MongoClient
import datetime

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.ncc_db


@app.route('/')
def home():
    # Get latest 5 notifications and news items sorted by date (newest first)
    notifications = list(db.notifications.find().sort("date", -1).limit(5))
    news_items = list(db.latest_news.find().sort("date", -1).limit(5))
    return render_template('index.html',
                           notifications=notifications,
                           news_items=news_items)


@app.route('/admin/news', methods=['GET', 'POST'])
def add_news():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form.get('content', '')  # Added content field
        link = request.form.get('link', '')

        db.latest_news.insert_one({
            'title': title,
            'content': content,
            'link': link,
            'date': datetime.datetime.now()
        })
        return redirect('/admin/news')

    return render_template('add_news.html')


@app.route('/api/news')
def api_news():
    news_items = list(db.latest_news.find().sort("date", -1).limit(5))
    return {'news': news_items}


# ... rest of your routes remain the same ...
@app.route('/regular')
def regular_wing():
    fsfs_awards = list(db.fsfs_achievements.find().sort("year", -1))
    return render_template('regular.html   ', fsfs_awards=fsfs_awards)

@app.route('/air')
def air():
    fsfs_awards = list(db.fsfs_achievements.find().sort("year", -1))
    return render_template('air.html', fsfs_awards=fsfs_awards)


# FSFS route - showing achievements
@app.route('/fsfs')
def fsfs():
    fsfs_awards = list(db.fsfs_achievements.find().sort("year", -1))
    return render_template('fsfs.html', fsfs_awards=fsfs_awards)

# Gallery route
@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

if __name__ == '__main__':
    app.run(debug=True)
