from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text')
    
    if text:
        # Analyze sentiment using TextBlob
        blob = TextBlob(text)
        sentiment_score = blob.sentiment.polarity
        sentiment = "Positive" if sentiment_score > 0 else "Negative" if sentiment_score < 0 else "Neutral"
        
        return jsonify({
            'score': sentiment_score,
            'sentiment': sentiment
        })
    else:
        return jsonify({'error': 'No text provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
