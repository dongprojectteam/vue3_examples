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
ubuntu@ip-172-31-53-21:~/database$ cat monitor.sh
#!/bin/bash
path=/home/ubuntu/database
pid_file=$path/express.pid
run_file=$path/run.sh
if test -f "$pid_file"; then
    echo "file exist"
    pid=$(cat "$pid_file")
    if ! ps -p $pid > /dev/null ; then
        sh $run_file
    fi
else
    echo "file not exist"
    sh $run_file
fi