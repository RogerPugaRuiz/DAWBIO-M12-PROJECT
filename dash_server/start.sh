#!/bin/sh
pip install -r requirements.txt
port="8050";
host="localhost";
while getopts "p:h:" arg; do
  case $arg in
    p) port=$OPTARG;;
    h) host=$OPTARG;;
  esac
done

python3 app.py $port $host