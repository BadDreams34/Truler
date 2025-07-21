const { stats } = require("@prisma/client");
const prisma = require("./prisma");

async function checkiffriend(userid, other) {
  const data = await prisma.friendship.findMany({
    where: {
      OR: [
        { AND: [{ user1id: userid }, { user2id: other }] },
        { AND: [{ user1id: other }, { user2id: userid }] },
      ],
    },
  });
  console.log("there i no fr", data);
  return data;

}

async function checkifreq(userid, other) {
  const data = await prisma.requests.findMany({
    where: {
      OR: [
        { AND: [{ senderid: userid }, { recieverid: other }] },
        { AND: [{ senderid: other }, { recieverid: userid }] },
      ],
    },
  });
  console.log("there is no req", data);
  return data;
}

// fetching all friends for friends list
async function Showfriend(userid) {
  let data = await prisma.friendship.findMany({
    where: {
      OR: [{ user1id: userid }, { user2id: userid }],
    },
  });

  if (!data.length) {
    data = [];
    return data;
  } else {
    for (let frind of data) {

      if (frind.user1id === userid) {
          const friend = await prisma.user.findMany({
        where: {
          id: frind.user2id,
        },
      });
      frind.friend = friend;
      } else {
          const friend = await prisma.user.findMany({
        where: {
          id: frind.user1id,
        },
      });
      frind.friend = friend;

      }
    }
  }
  return data;
}


// fetching all requests sent/recieved to/by a particular user in requests
async function Requests(userid) {


  const data = await prisma.requests.findMany({
    where: {
      AND: [
        { OR: [{ senderid: userid }, { recieverid: userid }] },
        { status: stats.PENDING },
      ],
    },
  });

  let result = [];

  if (data == null) {
    result = [];
  } else {
    result = data;
    for (let req of result) {
      if (req.senderid == userid) {
        req.relation = "sent";
        const reciever = await prisma.user.findUnique({
          where: { id: req.recieverid },
        });
        const username = reciever.username;
        req.username = username;
   
      } else {
        req.relation = "recieved";
        const sender = await prisma.user.findUnique({
          where: { id: req.senderid },
        });

        const username = sender.username;

        req.username = username;
      }
    }
  }


  return result;
}


// sending a request to a particular user
async function SendReq(senderid, recieverid) {
  try {
    const request = await prisma.requests.create({
      data: {
        sender: { connect: { id: senderid } },
        reciever: { connect: { id: recieverid } },
      },
    });
    const result = { success: true, request };
    return result;
  } catch (err) {
    console.log(err);
    if (
      err.code == "P2002" &&
      err.meta.target.includes("senderid") &&
      err.meta.target.includes("recieverid")
    ) {
      const data = { success: false, message: "Request Already Sent" };
      return data;
    }
  }
}

// accepting friend request
async function AcceptReq(accepterid, senderid) {
  const request = await prisma.requests.update({
    where: {
      senderid_recieverid: {
        senderid: senderid,
        recieverid: accepterid,
      },
    },
    data: {
      status: stats.ACCEPTED,
    },
  });
  const [u1, u2] =
    accepterid < senderid ? [accepterid, senderid] : [senderid, accepterid];
 
  const friend = await prisma.friendship.create({
    data: { user1id: u1, user2id: u2 },
  });

}

// remove friend
async function removefriend(delter, deleted) {
  const [u1, u2] = delter < deleted ? [delter, deleted] : [deleted, delter];

  const data = await prisma.requests.deleteMany({
    where: {
      OR: [
        { AND: [{ senderid: u1 }, { recieverid: u2 }] },
        { AND: [{ senderid: u2 }, { recieverid: u1 }] },
      ],
    },
  });
    const messagedelte = await prisma.usermessages.deleteMany({
        where: {
    OR: [
      { user1id: u1, user2id: u2 },
      { user1id: u2, user2id: u1 }
    ]
  }
    })

  const removed = await prisma.friendship.deleteMany({
    where: {
    OR: [
      { user1id: u1, user2id: u2 },
      { user1id: u2, user2id: u1 }
    ]
  }
  });
}


// sending a message to a particular user:
async function sendMessages(text, senderid, recieverid, sender) {
  const [user1id, user2id] =
    senderid < recieverid ? [senderid, recieverid] : [recieverid, senderid];
  const messagedet = await prisma.usermessages.create({
    data: {
      text,
      user1id,
      user2id,
      sendername: sender,
    },
  });
}
async function usermessages() {
  const mess = await prisma.usermessages.findMany()
}

// changing username and name adding bio
async function changeusername(userid, username) {
  const userme = await prisma.user.findUnique({
    where: {
      id: userid
    }
  })
const oldname = userme.username

  const user = await prisma.user.update({
    where: { id:userid },
    data: { username },
  });

  const sendernamechange = await prisma.usermessages.updateMany({
    where : {
      sendername : oldname
    },
    data: {
      sendername: username
    }
  })

}
// bio edit
async function bio(userid, bio) {
  const user = await prisma.user.update({
    where: { id:userid },
    data: { bio },
  });
  console.log("BIOOO", user)
}

// show a user detail on profile click and profile edit page
// may be taken req.user.id or from different src lol
async function userdet(userid) {
  const user = await prisma.user.find({
    where: { id: userid },
  });
}

// fetching all the messages sent by a user and recievd in a chatbox
async function messages(userid1, userid2) {
  const [u1, u2] = userid1 < userid2 ? [userid1, userid2] : [userid2, userid1];

  const messages = await prisma.usermessages.findMany({
    where: {
      user2id: u2,
      user1id: u1,
    },
  });

  return messages;
}


// signing up a user
async function Signup(username, password, email) {
  try {
    const user = await prisma.user.create({
      data: { username, password, email },
    });
    const data = { success: true, user };

    return data;
  } catch (err) {
    console.log(err);
    if (err.code == "P2002" && err.meta.target.includes("username")) {
      const data = { success: false, message: "Username Already Exists" };
      return data;
    } else if (err.code == "P2002" && err.meta.target.includes("email")) {
      const data = { success: false, message: "Email Already Exists" };
      return data;
    }
  }
}

// delete account
async function Deleteaccount(username) {
  const user = await prisma.user.delete({
    where: { username },
  });
}

async function checkeuser(username) {

  const user = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });

  return user;
}

// authentiation
async function checkuser(username) {

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}

async function finduserbyid(userid) {
  const user = await prisma.user.findMany({
    where: {
      id: userid,
    },
  });
  return user;
}

async function RejectReq(rejectorid, recieverid) {
  const all = await prisma.requests.findMany()
  console.log(all)
  console.log(rejectorid, recieverid)
  const request = await prisma.requests.delete({
    where: {
      senderid_recieverid: { senderid: recieverid, recieverid:rejectorid },
    },
  });
}

async function CancelReq(rejectorid, recieverid) {
  const request = await prisma.requests.delete({
    where: {
      senderid_recieverid: { senderid: rejectorid, recieverid: recieverid },
    },
  });
}

async function sesssion(u1, u2) {
  const data = await prisma.requests.deleteMany({
    where: {
      OR: [
        { AND: [{ senderid: u1 }, { recieverid: u2 }] },
        { AND: [{ senderid: u2 }, { recieverid: u1 }] },
      ],
    },
  });
}



module.exports = {
  Showfriend, //
  Requests, //
  SendReq, //
  AcceptReq, //
  removefriend, //
  sendMessages, //
  changeusername, 
  RejectReq, //
  CancelReq, //
  sesssion, //
  checkuser, //
  finduserbyid, //
  checkeuser, //
  bio, //
  userdet, //
  messages, //
  Signup, //
  Deleteaccount, //no leave
  checkiffriend, //
  checkifreq, //
};



