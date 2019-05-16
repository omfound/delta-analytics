from ompgov_api.search import get_sessions, get_captions_by_session, get_session_by_id
from model import tag_captions
import sqlite3
from datetime import datetime as dt
from contextlib import closing
import pickle
import argparse

DB_FILE = 'example_topic_tagged.db'

class DuplicateSessionError(Exception):
	pass

def exec_query(query, db_file=DB_FILE, loop_values=None):
    with closing(sqlite3.connect(db_file)) as con, con,  \
            closing(con.cursor()) as cur:
        if loop_values:
        	cur.executemany(query, loop_values)
        else:
	        cur.execute(query)
        return cur.fetchall()

def store_topic_key(db_file=DB_FILE):
	if not db_has_table('topics', db_file=db_file):
		exec_query('''
			CREATE TABLE topics 
			(topic_id int, topic_name text)''', db_file=db_file)
		with open("distinct_topic_ids.pkl","rb") as f:
			topic_labels = pickle.load(f)
		exec_query('INSERT INTO topics VALUES (?,?)', db_file, 
			((v,k) for (k,v) in sorted(topic_labels.items(),key=lambda x:x[1])))
	else:
		pass

def db_has_table(table, db_file=DB_FILE):
	check_for_tbl_query = ("SELECT name FROM sqlite_master "
						   "WHERE type='table' AND name='{}';".format(table))
	return bool(exec_query(check_for_tbl_query, db_file=db_file))

def validate_new_session(session_id, table, db_file=DB_FILE):
	if db_has_table(table, db_file=db_file):
		session_exists = exec_query(
			'SELECT * FROM {} WHERE session_id=\'{}\''.format(
				table, session_id), db_file=db_file)
		if session_exists:
			raise DuplicateSessionError(
				"Session ID '{}' already exists in table {}".format(session_id, table))
	else:
		pass

def store_captions(captions, db_file=DB_FILE, validate=True):
	#captions = get_captions_by_session(session_id)['results']
	#tag_captions.add_caption_topics(captions)
	exec_query('''
		CREATE TABLE IF NOT EXISTS session_captions
        (session_id int, caption_id int, topic_id int, duration int)''', db_file=db_file)
	
	if validate:
		for session_id in set(d['session_id'] for d in captions):
			validate_new_session(session_id, 'session_captions', db_file=db_file)

	has_topic_tags = all('topics' in cap.keys() for cap in captions)
	if not has_topic_tags:
		print("Adding Topics to Captions")
		tag_captions.add_caption_topics(captions)
	has_duration_tags = all('duration' in cap.keys() for cap in captions)
	if not has_duration_tags:
		print("Adding Durations to Captions")
		tag_captions.add_caption_duration(captions)
	
	caption_rows = []
	for cap in captions:
	    topics = cap['topics']
	    duration = cap['duration']
	    session_id = int(cap['session_id'])
	    caption_id = int(cap['id'])
	    if not topics:
	        topics = [None]
	    for topic in topics:
	        row = [session_id, caption_id, topic, duration]
	        caption_rows.append(row)
	exec_query('INSERT INTO session_captions VALUES (?,?,?,?)', db_file, caption_rows)

def store_session(session_info, db_file=DB_FILE, validate=True):
	#session = get_session_by_id(session_id)
	session_id = int(session_info['id']) 
	created_at = dt.utcfromtimestamp(
		int(session_info['created'])).strftime("%Y-%m-%d %H:%M:%S")
	
	exec_query('''
		CREATE TABLE IF NOT EXISTS sessions
        (session_id int, created_at timestamp)''', db_file=db_file)
	if validate:
		validate_new_session(session_id, 'sessions', db_file=db_file)
	exec_query('INSERT INTO sessions VALUES ({},\'{}\')'.format(session_id, created_at), db_file=db_file)
	
def store_session_data(session_id, db_file=DB_FILE):
	try:
		validate_new_session(session_id, 'sessions', db_file=db_file)
		print("Gathering session information")
		session_info = get_session_by_id(session_id)['results'][0]
		store_session(session_info, db_file=db_file, validate=False)
		print("Session {} stored".format(session_id))
	except DuplicateSessionError as e:
		print(str(e))
	try:
		validate_new_session(session_id, 'session_captions', db_file=db_file)
		print("Gathering session captions")
		captions = get_captions_by_session(session_id)['results']
		store_captions(captions, db_file=db_file)
		print("Session captions {} stored".format(session_id))
	except DuplicateSessionError as e:
		print(str(e))


if __name__ == "__main__":
	parser = argparse.ArgumentParser(description = "Add session to SQL DB")
	parser.add_argument('session_ids',
                        help='Session ID, comma separated')
	parser.add_argument('-db', '--database', type=str, help='Database file path')
	args = parser.parse_args()
	db_file = args.database if args.database else DB_FILE
	session_ids = (sid.strip() for sid in args.session_ids.split(','))
	
	store_topic_key(db_file=db_file)
	for sid in session_ids:
		store_session_data(sid, db_file=db_file)



