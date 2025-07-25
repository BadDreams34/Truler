# Truler
Messaging App Made With NodeJS/ Vanilla JavaScript 

<img width="799" height="526" alt="image" src="https://github.com/user-attachments/assets/c20addb1-61b8-4afa-a6ec-3098d4c696e4" />


## Functionality
- Send friend requests to other users, cancel requests and reciever can either accept Or reject request.
- Send Messages to friends and remove friends.
- Edit bio and username.
- Unique UI and responsive and works on any device.

## Features 
- Session Based Authentiation with PassPortJS.
- Uses ExpressJS FrameWork for API.
- Backend powered by a PostgreSQL database that stores users and their information, including bio, username, etc., along with friend relationships, request statuses, and messages.
- Utilises Prisma for simplifying PostgreSQL queries and stores hashed password with bcrypt.

## Setup
- Clone this Repository with `git clone`
- Create a .env file in the root folder with the following variables : `PORT`, `SECRET`, `DATABASE_URL`.
```
//example of .env
// change the values accordingly 
DATABASE_URL="postgresql://dfsasdf@localhost:5432/sdfafds?schema=public"
SECRET="dfljsafjalfjasldjfasdlfj"
PORT="5323"
```

- Run `npm run setup` for install Required Packages and Setting up database.
- Run your Backend with `npm run start`


## Help 
- For any help Reach out to me on discord @mdi38
  


