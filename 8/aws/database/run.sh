#!/bin/bash
path=/home/ubuntu/database
pid_file=$path/express.pid


if test -f "$pid_file"; then
    pid=$(cat "$pid_file")
    if ps -p $pid > /dev/null; then
        if [ "$1" = "restart" ] || [ "$1" = "stop" ]; then
            kill $pid
            if [ "$1" = "stop" ]; then
                echo "Server Stopped"
                return
            fi
        else
            return
        fi
    fi
fi

if [ "$1" != "stop" ]; then
    node $path/index.js &
    echo $! > $path/express.pid
    echo "Server Started"
fi