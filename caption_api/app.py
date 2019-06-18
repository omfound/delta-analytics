from flask import Flask, g, request, jsonify
import requests
import sqlite3
import time
import datetime

DATABASE = 'example.db'

app = Flask(__name__)

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

	results = []

	# parameters
	start_date = request.args.get('start_date', None)
	end_date = request.args.get('end_date', None)

	if start_date and end_date:

		# ~ make the first call to the API
		temp_results = requests.get(
			'http://open.ompnetwork.org/api/sessions', 
			params = dict(
				createdAfter = time.mktime(datetime.datetime.strptime(start_date, "%Y-%m-%d").timetuple()),
				createdBefore = time.mktime(datetime.datetime.strptime(end_date, "%Y-%m-%d").timetuple()),
				limit = 500
			)
		).json()

		# ~ save the first results to our return object
		# ~ record the total number of results to pull 
		results.extend(temp_results["results"])
		n_results = int(temp_results["totalSize"])
		offset = 500

		while (offset < n_results):

			temp_results = requests.get(
				'http://open.ompnetwork.org/api/sessions', 
				params = dict(
					createdAfter = time.mktime(datetime.datetime.strptime(start_date, "%Y-%m-%d").timetuple()),
					createdBefore = time.mktime(datetime.datetime.strptime(end_date, "%Y-%m-%d").timetuple()),
					start = offset,
					limit = 500
				)
			).json()

			# ~ save the news results to our return object
			# ~ increment the offset
			results.extend(temp_results["results"])
			offset = offset + 500

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

def get_topic_analytics():

	# parameters
	# ==========
	# ~ topic id 
	ids = request.args.get('ids', None)
	return 'Topic analytics'

	
