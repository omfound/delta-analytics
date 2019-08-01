#!/usr/bin/env bash 

export FLASK_ENV=development
export FLASK_APP=backend/caption_api/app.py

flask run &
yarn --cwd frontend/app start &