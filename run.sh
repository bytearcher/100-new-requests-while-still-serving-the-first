#!/bin/bash

node server &

sleep 1

amount=100
ab -c $amount -n $amount http://127.0.0.1:3000/ &> /dev/null
