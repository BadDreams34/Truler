# Truler
Messaging App Made With NodeJS/ Vanilla JavaScript 

<img width="799" height="526" alt="image" src="https://github.com/user-attachments/assets/c20addb1-61b8-4afa-a6ec-3098d4c696e4" />


## Functionality
- Send Friend Requests to other Users, cancel Requests and Reciever can either Accept Or Reject Request.
- Send Messages to Friends and Remove Friends.
- Edit Bio and username.
- Unique UI and Responsive and Works on any Device.

## Features 
- Session Based Authentiation with PassPortJS.
- Uses ExpressJS FrameWork for API.
- Backend packed with PostgreSQL Database which Stores Users and their information including Bio,username,etc. , Friends Relation, Requests and their Status along with Messages.
- Utilises Prisma for simplifying PostgreSQL Queries and Stores hashed Password with Bcrypt.

## Setup
- Clone this Repository with `git clone`
- Create a .env file in the root folder with the following variables : `PORT`, `SECRET`, `DATABASE_URL`.
```
  //.env
// change the values accordingly 
DATABASE_URL="postgresql://dfsasdf@localhost:5432/sdfafds?schema=public"
SECRET="dfljsafjalfjasldjfasdlfj"
PORT="5323"
```

- Run `npm run setup` for install Required Packages and Setting up database.
- Run your Backend with `npm run start`


## Help 
- for any help Reach out to me. my discord @mdi38
  


