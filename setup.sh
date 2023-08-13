#!/bin/bash

function makeAliases() {
    ip_address="127.0.0.1"
    host_name="$1"

    matches_in_hosts="$(grep -n "$host_name" /etc/hosts | cut -f1 -d:)"
    host_entry="${ip_address} ${host_name}"

    echo "Please enter the password."

    if [ -n "$matches_in_hosts" ]
    then
        echo "Updating existing record."
        while read -r line_number; do
            sudo sed -i '' "${line_number}s/.*/${host_entry} /" /etc/hosts
        done <<< "$matches_in_hosts"
    else
        echo "Adding new record."
        echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
    fi
}

function makeCerts() {
    brew install mkcert
    mkcert -install

    mkdir certs
    mkcert -key-file key.pem -cert-file cert.pem "$1"
    mv key.pem cert.pem certs
}

domain="localhost" # Change this to your domain: ie. local-app.example.com
makeAliases $domain
makeCerts $domain
