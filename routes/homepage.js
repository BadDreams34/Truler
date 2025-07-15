const {Router} = require('express')
const { Showfriend, Requests, SendReq} = require('../queries')
const homepage = Router();


homepage.get('/allfriends', async (req,res)=>{
    try {
         const friends = await Showfriend(req.user.id)
         res.json(friends, {"message": "success"})
    } catch(err) {
        console.log(err)
        res.json({"message" : err})
    }
})


// requests button ok all pending requests
homepage.get('/requests', async (req, res,next)=>{
      try {
         const friends = await Requests(req.user.id)
         res.json(friends, {"message": "success"})
    } catch(err) {
        console.log(err)
        res.json({"message" : err})
    }

})

// add friend button lol ok

homepage.post('/addfriend', async (req,res,next)=> {
    const reciverusername = req.body.username
    const ruser = await checkuser(reciverusername)
    if (!ruser && ruser.id == req.user.id) {
       return res.json({message: "Double Check the username!"})
    }
    await SendReq(req.user.id, ruser.id )
    return res.json({message: `Your friend request to ${reciverusername} was successfully sent`})
})

// accept and reject request too ok 

homepage.post('/acceptreq',async (req,res)=>{
     const senderuserid = req.body.userid
     const accepterid = req.user.id
     await AcceptReq(accepterid, senderuserid)
     res.json({message: "Added Successfully"})
})

homepage.post('/rejectreq', async (req, res)=> {
    const senderuserid = req.body.userid
     const accepterid = req.user.id
     await RejectReq(accepterid, senderuserid)
     res.json({message: "Rejected Successfully"})

})
module.exports = homepage