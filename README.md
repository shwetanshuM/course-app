course selling app

this is a basic full stack course selling application built using node.js, express, mongodb, and vanilla html, css, and javascript. it supports two types of users: normal users and admins.

features are:

user--

sign up and sign in

view all available courses

purchase courses

view purchased courses

admin--

sign up and sign in

create new courses

edit existing courses

view all courses created by the admin

technology stack

node.js

express

mongodb with mongoose

vanilla javascript for frontend

axios for api requests

project structure--

backend contains all routes, models, middleware, and database logic

frontend contains static html pages and a single script file for all client-side logic

running the project--

install dependencies-npm install

create a .env file with:
MONGO_URL=your_mongo_connection_string
JWT_USER_PASSWORD=your_secret
JWT_ADMIN_PASSWORD=your_secret

start the server-node index.js

open frontend pages directly in the browser or through express static hosting

notes--

all authentication is done using json web tokens

the project is kept simple intentionally for learning purposes
