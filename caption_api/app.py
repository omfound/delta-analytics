from flask import Flask, g, request, jsonify
from flask_cors import CORS
import requests
import sqlite3
import time
import datetime

DATABASE = 'example.db'
CAPTION_API = 'http://localhost:5000'

app = Flask(__name__)
CORS(app)

# database utilities
# ~ cribbed from http://flask.pocoo.org/docs/1.0/patterns/sqlite3/
def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		g._database = sqlite3.connect(DATABASE)
		db = g._database
	db.row_factory = make_dicts
	return db 

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

# app endpoints
@app.route('/')
def index():
	return 'API for Caption Tag Model'

@app.route('/topics', methods=['GET'])
def get_topics():
	results = query_db('select * from topics;')
	return jsonify(results)

@app.route('/sessions', methods=['GET'])
def get_session_info():

	# final results object
	results = []

	# parameters
	default_topic_ids = ','.join(list(str(x) for x in range(0, 35)))
	start_date = request.args.get('start_date', None)
	end_date = request.args.get('end_date', None)
	topic_ids = request.args.get('topic_ids', default_topic_ids)

	if start_date and end_date and topic_ids:

		# temporary results object
		temp_results = []

		unix_start_date = time.mktime(datetime.datetime.strptime(start_date, "%Y-%m-%d").timetuple())
		unix_end_date = time.mktime(datetime.datetime.strptime(end_date, "%Y-%m-%d").timetuple())

		# ~ make the first call to the OMF API
		temp_api_results = requests.get(
			'http://open.ompnetwork.org/api/sessions', 
			params = dict(
				createdAfter = unix_start_date,
				createdBefore = unix_end_date,
				limit = 500
			)
		).json()

		# ~ save the first results to our return object
		# ~ record the total number of results to pull 
		temp_results.extend(temp_api_results["results"])
		n_results = int(temp_api_results["totalSize"])
		offset = 500

		while (offset < n_results):

			temp_api_results = requests.get(
				'http://open.ompnetwork.org/api/sessions', 
				params = dict(
					createdAfter = unix_start_date,
					createdBefore = unix_end_date,
					start = offset,
					limit = 500
				)
			).json()

			# ~ save the news results to our return object
			# ~ increment the offset
			temp_results.extend(temp_api_results["results"])
			offset = offset + 500

		# ~ from the OMF API, pull caption information for each session 
		temp_results2 = []
		for session in temp_results: 
			captions = requests.get('http://open.ompnetwork.org/api/session/{}/captions'.format(session['id']))
			session['captions'] = captions.json().get('results', [])
			temp_results2.append(session)

		# ~ from the Caption Database, pull sessions associated with our topics 
		relevant_sessions = query_db('''
			select 
				distinct s.session_id 
			from sessions s inner join session_captions sc on s.session_id = sc.session_id
			where s.created_at >= '{}'
			  and s.created_at < '{}'
			  and sc.topic_id in ({});
		'''.format(start_date, end_date, topic_ids))
		relevant_sessions = [x['session_id'] for x in relevant_sessions]

		# ~ intersect sessions from OMF API with sessions from Caption Database
		temp_results3 = ([
			x
			for x 
			in temp_results2 
			if int(x['id'])
			in relevant_sessions
		])

		# ~ assign our temp results back to our final results obj
		results = temp_results3

	return jsonify(results)

@app.route('/session_analytics/', methods=['GET'])
def get_session_analytics():

	results = {}

	# parameters
	start_date = request.args.get('start_date', None)
	end_date = request.args.get('end_date', None)
	topics = request.args.get('topics', None)
	

	# TODO: this whole chunk is a SQL injection waiting to happen
	# ~ need to properly escape SQL parameter arguments 
	if start_date and end_date and topics: 

		list_topics = topics.split(',')
		formatted_topics = ','.join(f"'{topic}'" for topic in list_topics)

		with open('sql/session_analytics.sql', 'r') as f: 
			query_template = f.read() 

		query = query_template.format(
			start_date = start_date,
			end_date = end_date,
			topics = formatted_topics
		)

		results = query_db(query)

	return jsonify(results)

	
