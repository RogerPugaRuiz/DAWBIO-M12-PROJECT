#!/bin/sh
pip install -r requirements.txt
port=""
host=""
while getopts "p:h:" arg; do
  case $arg in
    p) port=$OPTARG;;
    h) host=$OPTARG;;
  esac
done

if [[ $port = "" ]];
then
port="8050";
fi
if [[ $host = "" ]];
then
host="localhost"
fi

python3 app.py $port $host