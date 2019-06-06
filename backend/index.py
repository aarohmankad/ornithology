import json
from elasticsearch import Elasticsearch

es = Elasticsearch([{
  'host': 'localhost',
  'port': 9200
}])
filename = "portal.json"

i = 1
with open(filename, 'r') as tweets:
  for raw_tweet in tweets:
    print(i)
    tweet = json.loads(raw_tweet)
    tweet_data = {
      "username": tweet['user']['name'],
      "user_image": tweet['user']['profile_image_url'],
      "user_id": tweet['user']['id'],
      "user_screenname": tweet['user']['screen_name'],
      "time": tweet['created_at'],
      "text": tweet['text'],
      "urls": tweet['entities']['urls'],
      "hashtags": tweet['entities']['hashtags']
    }
    es.index(index="tweets", ignore=400, body=tweet_data, doc_type="document")
    i += 1
