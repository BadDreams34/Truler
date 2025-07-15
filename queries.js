const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


// fetching all friends for friends list
async function Showfriend(userid) {
   
    const data = await prisma.friendship.findMany({
        where : {
            OR: [{user1id: userid},{user2id: userid}]
        }
    })
    return data

}


// fetching all requests sent/recieved to/by a particular user in requests
async function Requests(userid) {
    
    const data = await prisma.requests.findMany({
        where : {
            AND: [{OR: [{senderid: userid},{recieverid: userid}]}, {stats: PENDING}]
        }
    })
}

// sending a request to a particular user
async function SendReq(senderid, recieverid) {
    
    const request = await prisma.requests.create({
        data: {
            senderid, recieverid
        }
    })
}

// accepting friend request
async function AcceptReq(accepterid, senderid) {
    const request = await prisma.requests.update({
        where: {
           senderid_recieverid: {
        senderid: senderid,
        recieverid: accepterid
      }
        },
        data: {
            status: stats.ACCEPTED
        }
    })
const [u1, u2] = (accepterid < senderid) ? [accepterid, senderid] : [accepterid, senderid]
    const friend = await prisma.friendship.create({
        data: {user1id: u1,
              user2id: u2}
    })
}

// remove friend
async function removefriend(delter, deleted) {
    const [u1, u2] = (delter< deleted) ? [delter, deleted] : [deleted, delter]
    const removed = await prisma.friendship.delete({
        where: {
          user1: u1, user2:u2
        }
    })
}


// sending a message to a particular user:
async function sendMessages(text, senderid, recieverid) {
    const [user1id, user2id] = (senderid< recieverid) ? [senderid, recieverid] : [senderid, recieverid]
    const messagedet = await prisma.usermessages.create({
        data: {
            text,
            user1id,
            user2id }
    })
}



// changing username and name adding bio
async function changeusername(userid, username) {
    const user = await prisma.users.update({
        where: {userid},
        data: {username}
    }
)
}
// bio edit
async function bio(userid, bio) {
        const user = await prisma.users.update({
        where: {userid},
        data: {bio}
    }
)
}

// show a user detail on profile click and profile edit page
// may be taken req.user.id or from different src lol
async function userdet(userid) {
    const user = await prisma.users.find({
        where: {id: userid}
    })
}


// fetching all the messages sent by a user and recievd in a chatbox
async function messages(userid1, userid2) {
    const [u1, u2] = (userid1< userid2) ? [userid1, userid2] : [userid2, userid1]
    const messages = await prisma.usermessages.findMany({
        where : {
            user1id: u1,
            user2id: u2
        }

    })
}

// signing up a user
async function Signup(username,password,email ) {
    try {
         const user = await prisma.users.create({
        data: {username, password, email}
       
    })
    const data = {success:true, user}
    console.log(user)
    return data
    } catch(err) {
        console.log(err)
        if (err.code == 'P2002' && err.meta.target.includes('username')) {
            const data = {success:false, message: "Username Already Exists"}
            return data
        } else if (err.code == 'P2002' && err.meta.target.includes('email')) {
            const data = {success:false, message: "Email Already Exists"}
            return data
        }
    }


}



// delete account 
async function Deleteaccount(username) {
    const user = await prisma.users.delete({
        where : {username}
    })
}


// authentiation
async function checkuser(username) {
    const user = await prisma.users.findUnique({
        where: {
            email: username
        }
    })
    return user
}

async function finduserbyid(userid) {
    const user = await prisma.users.findMany({
        where: {
            id: userid
        }
    })
    return user
}

async function RejectReq(rejectorid, recieverid) {
    
    const request = await prisma.requests.delete({
        where: {
            senderid: rejectorid, recieverid
        }
    })
}




module.exports = {
    Showfriend,
    Requests,
    SendReq, 
    AcceptReq,
    removefriend,
    sendMessages,
    changeusername,
    RejectReq,
    checkuser,
    finduserbyid,
    bio, userdet, messages, Signup, Deleteaccount
}





