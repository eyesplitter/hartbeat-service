# Heartbeat service
Simple api to gather heartbeats from clients

[![Build][build-shield]][build-url]

### Getting Started


Install [Docker](https://www.docker.com/) with [kubernetes](https://docs.docker.com/desktop/kubernetes/#enable-kubernetes) support and [skaffold](https://skaffold.dev/docs/install/)

Install dependencies and run the app

    cd app
    npm i
    cd ..
    skaffold dev
    
### Notes

- I decided to use Redis because it can handle expired heartbeats outside the app
- All endpoints always respond. If we have no data to respond we return an empty object
- All errors have the same data structure so clients can handle them the same way
- You can add new error messages through the custom error handler middleware
- The app will return an error if the client sends a heartbeat with an existing ID and wrong group name instead of updating the entry