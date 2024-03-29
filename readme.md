# Forum Backend

This is the completed version of the forum backend tutorial. 
This backend is written in TypeScript, and it uses the AdonisJS 
framework. This should help teach the basics of how to use 
AdonisJS for backend development. I use Docker to run the node 
server and MySQL Database.

Before you get started you'll want to install
 - Node 16 installed (I use NVM to do so)
 - Docker Desktop

## Create a .env file

Create a .env file. These are the values I was using for testing

    PORT=3333
    HOST=0.0.0.0
    NODE_ENV=development
    APP_KEY=nSblyAXK5AQOp2Ky9HPDr79v80WYgSMs
    DRIVE_DISK=local
    DB_CONNECTION=mysql
    MYSQL_HOST=mysqldb
    MYSQL_PORT=3306
    MYSQL_USER=forum_backend
    MYSQL_PASSWORD=f9082m3e4f09
    MYSQL_DB_NAME=forum_backend


## Running the Backend Locally

To start the application run 

    docker compose up

This might take a while. **You might also have to run it twice** 
my first run the MySQL service failed. 

Then the app should be running on port 3333.

## Endpoints for Postman

The *Forum Backend.postman_collection.json* file is my
export from Postman you can use to play with the endpoints.

The first thing you should do is go to the "Save User"
endpoint and create a user with an email and a password.

Next you should called the "Login User" endpoint and 
login by passing the email and password you just made.

This will return a token. Take that token and save it
as the API_TOKEN variable. 

To do that click on the Forum Backend collection, 
then click the variables tab and update the current value.

## Step-by-Step Instructions

The *Forum Backend with AdonisJS.pdf* provides step-by-step 
instructions on how to create the project from scratch.



