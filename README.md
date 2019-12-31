# Project Title

Blogging Website(Similar to Facebook and Instagram).


# Getting started

To get the Node server running locally:

- Clone this repo.
- `npm install` to install all required dependencies
- Install MongoDB Compass  and connect to localhost.(Create database Posts).
- `npm start` to start the local server

# Code Overview
- User have to register and login in order to post something.
- All the user and view the posts.
- Only user can update the personal deatils and post details.
- All the forms are protected by google Captcha v2.



## Dependencies

- [expressjs] - The server for handling and routing HTTP requests
- [jsonwebtoken] - For generating JWTs used by authentication
- [mongoose] - For modeling and mapping MongoDB data to javascript 
- [express-validator] -For validating user input.
- [multer] - For uploading file into server.
- [body-parser] - To parse the body of user input.


## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `public/` - This folder contains all the html,css,and js files.

## License

This project is licensed under the MIT License - see the [LICENSE]  file for details