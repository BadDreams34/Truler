# Truler
Messaging App Made With NodeJS/ Vanilla JavaScript 

## Features 
- Session Based Authentiation with PassPortJS.
- Uses ExpressJS FrameWork for API.
- Backend packed with PostgreSQL Database which Stores Users and their information including Bio,username,etc. , Friends Relation, Requests and their Status along with Messages.
- Utilises Prisma for simplifying PostgreSQL Queries and Stores hashed Password with Bcrypt.

## Functionality
- Send Friend Requests to other Users, cancel Requests and Reciever can either Accept Or Reject Request.
- Send Messages to Friends and Remove Friends.
- Edit Bio and username.
- Unique UI and Responsive and Works on any Device.


## Setup
- Clone this Repository with `git clone`
- `npm install` to install all the required packages.
- Change the value of `PORT` variable in app.js to your desired Port.
- Create a .env file in the root folder with Variable `DATABASE_URL` with value of your Database URL and `SECRET` with value of your secret string for your session authentiation.
- Run `npx prisma db pull` and `npx prisma migrate dev`
- Run your Backend with `node app.js`

  


