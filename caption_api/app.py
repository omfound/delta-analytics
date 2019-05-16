from flask import Flask, g 
import sqlite3

DATABASE = 'example.db'

app = Flask(__name__)

def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		g._database = sqlite3.connect(DATABASE)
		db = g._database
	return db 

@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()


@app.route('/')
def index():
	return 'API for Caption Tag Model'

@app.route('/topics', methods=['GET'])
def get_topics():
	ids = request.args.get('ids', None)
	return str(ids)

@app.route('/sessions', methods=['GET'])
def get_session_info():

	# parameters
	# ==========
	# ~ session ids 
	# ~ max limit 
	# ~ pagination ??

	ids = request.args.get('ids', None)
	limit = request.args.get('limit', 100)

	# parse ids into list of integers 
	# ~ error if one+ of them is invalid 
	# ~ if empty, pull 

	ids = ids.split(',')
	ids = ' + '.join(ids)
	return str(ids)

@app.route('/session_analytics/', methods=['GET'])
def get_session_analytics():

	# parameters
	# ==========
	# ~ session ids 
	ids = request.args.get('ids', None)
	return 'Session analytics'

def get_topic_analytics():

	# parameters
	# ==========
	# ~ topic id 
	ids = request.args.get('ids', None)
	return 'Topic analytics'

	
