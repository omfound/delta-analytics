# Delta Analytics

## Index


* [Frontend](frontend)
	* *[Static](frontend/static)*: Wireframes and mockups of frontend 
	* *[App](frontend/app)*: Prototype responsive frontend to search through sessions and visualize topic analytics
* [Backend](backend)
	* *[Caption API](backend/caption_api)*: Prototype API to serve captions tagged with topics 
	* *[Model](backend/model)*: NLP models to tag captions with topics
	* *[Jobs](backed/jobs)*: Batch scripts leveraging models to tag captions with topics 
	* *[OMP Gov API](backend/ompgov_api)*: Python utilities to scrape data from the OMF API 
* [Research](research): User interviews, brainstorming, etc.

## Purpose 

This repository houses work completed by Delta Analytics teams as part of their 2018 and 2019 commitments to the Open Media Foundation. The project has involved two components: 

1. Building a model to categorize transcribed captions of local government meetings into a broad set of topics (2018) 
2. Developing a prototype visualization and search tool that leverages the categorization model (2019)

## Usage

To run the app locally, run `./run_local.sh` in a terminal. Note that the backend API is fairly slow, so it may take some time to load sessions into view.