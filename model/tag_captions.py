from model.label_topics import *
import pandas as pd
import numpy as np
import requests
import os
import urllib3
import warnings
import gensim
from collections import OrderedDict

warnings.simplefilter('ignore')

urllib3.disable_warnings()

try:
    bool(w2v_model)
except NameError:
    vector_path = 'model/GoogleNews-vectors-negative300.bin'
    w2v_model = gensim.models.KeyedVectors.load_word2vec_format(vector_path, binary = True)


def caption_topics(caption_dict):
    """
    Return topics for single caption dict
    caption_dict (dict): Caption & Info as returned by caption API
    returns list 
    """
    lt = LabelTopics(
            captions=[caption_dict['caption']],
            session_ids=[caption_dict['session_id']])
    lt.clean_data()
    lt.predict_fluff()
    lt.predict_topic_labels()
    lt.get_w2v_predictions(w2v_model, session_thresh=.7)
    lt.combine_preds()
    assert len(lt.topic_labels.items())==1
    site_id, topics = list(lt.topic_labels.items())[0]
    return list(topics)

def add_caption_topics(captions):
    """
    Update elements in captions list by adding caption_topics list
    to caption_dict
    captions (list): List of caption dicts
    returns None
    """
    for idx, caption in enumerate(captions):
        try:
            bool(caption['topics'])
        except KeyError:
            topics = caption_topics(caption)
            captions[idx]['topics'] = topics

def session_topics(captions):
    """
    Returns frequency of topics in captions list
    """
    topics_counts = defaultdict(int)
    for caption in captions:
        try:
            for topic in caption['topics']:
                topics_counts[topic]+=1
        except KeyError:
            raise Exception("'Topics' not found in caption")
    return OrderedDict(sorted(topics_counts.items(), key=lambda x:x[1], reverse=True))