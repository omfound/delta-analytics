## Setup
* Update API key in config.cfg
* Download test_data.zip from Google Drive Delta/2019 and unzip in ompgov_api directory. 
	* `ompgov_api.mock_search` searches for data in `ompgov_api/test_data`

## Modules Explained
* `query.py` is the base tool for formulating & running api queries
* `search.py` can be used to easily call endpoint queries
* `mock_search.py` has all the same functions as `search.py` but gets data from stored data in `ompgov_api/test_data` rather than calling to the api.