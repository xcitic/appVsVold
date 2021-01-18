# appVsVold

## Project setup 
Run installation script called build.sh 
This will install the prerequisits: yarn, node and pm2 

## Setup mongodb 
Either you can run mongodb as a docker container, or you can install it directly on the host machine. 
Create a database, and a user with RW access to the database. 


## Add credentials
All the credentials are stored in the .env file. 
Your should add .env to your .gitignore file if you want to keep developing this project, to avoid exposing your secret environment variables. 
Add the database credentials.
Add the AWS S3 bucket credentials. 
Add the port you want to run the project on -> NODE_PORT 


## Setup reverse proxy 
Either your going to use nginx or apache2 
Setup a reverse proxy that points to the port you selected in the .env file NODE_PORT. 
Here is a guide to do that: 
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04


GL HF :) 