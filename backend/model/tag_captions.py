from model.label_topics import *
import pandas as pd
import numpy as np
import requests
import os
import urllib3
import warnings
import gensim
from collections import OrderedDict
from datetime import datetime
import sys

warnings.simplefilter('ignore')

urllib3.disable_warnings()

try:
    bool(w2v_model)
except NameError:
    print("Loading Word2Vec Model...", end='\r')
    vector_path = 'model/GoogleNews-vectors-negative300.bin'
    w2v_model = gensim.models.KeyedVectors.load_word2vec_format(vector_path, binary = True)
    sys.stdout.write("\033[K")
    print("Word2Vec Model Loaded.")


def caption_topics(caption_dict, text_label=False):
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
    if text_label:
        return list(topics)
    else:
        return lt.revert_topic_labels(topics)

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
            #duration = int(caption['seconds_end']) - int(caption['seconds_start'])
            captions[idx]['topics'] = topics
            #captions[idx]['duration'] = duration

def add_caption_duration(captions):
    """
    Update elemenst in captions list by adding duraption to caption_dict
    captions (list): List of caption dicts
    retuns None
    """
    for idx, caption in enumerate(captions):
        try:
            bool(caption['duration'])
        except KeyError:
            duration = int(caption['seconds_end']) - int(caption['seconds_start'])
            captions[idx]['duration'] = duration

def created_date(session):
    return datetime.utcfromtimestamp(int(session['created'])).strftime("%Y-%m-%d %H:%M:%S")

def caption_topics_table(captions):
    table = []
    for cap in captions:
        topics = cap['topics']
        duration = cap['duration']
        session_id = int(cap['session_id'])
        caption_id = int(cap['id'])
    if not topics:
        topics = [None]
    for topic in topics:
        row = [session_id, caption_id, topic, duration]
        table.append(row)
    return table

