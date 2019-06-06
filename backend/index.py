import json
from elasticsearch import Elasticsearch

def gen_tweet_data(tweets):
    for raw_tweet in tweets:
      tweet = json.loads(raw_tweet)
      yield {
        "_index": "bulk_tweets",
        "_type": "document",
        "doc": {
          "username": tweet['user']['name'],
          "user_image": tweet['user']['profile_image_url'],
          "user_id": tweet['user']['id'],
          "time": tweet['created_at'],
          "text": tweet['text'],
          "urls": tweet['entities']['urls'],
          "hashtags": tweet['entities']['hashtags']
        }
      }

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
filename = "portal.json"
with open(filename, 'r') as tweets:
  bulk(es, gen_tweet_data(tweets))