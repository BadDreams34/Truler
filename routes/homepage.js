const {Router} = require('express')
const { Showfriend, Requests, SendReq, checkuser, CancelReq,RejectReq, AcceptReq, checkiffriend, checkifreq, removefriend} = require('../queries')
const homepage = Router();


homepage.get('/allfriends', async (req,res)=>{
    try {
         console.log(req.email)
         const friends = await Showfriend(req.user[0].id)
        
         res.json({friends, user: req.user[0],"message": "success"})
    } catch(err) {
        console.log(err)
        res.json({"message" : err})
        
    }
})


// requests button ok all pending requests 
homepage.get('/requests', async (req, res,next)=>{
      try {
        console.log('requestsssssssss')
         const friends = await Requests(req.user[0].id)
         res.json(friends, {"message": "success"})
    } catch(err) {
        console.log(err)
        res.json({"message" : err})
    }
})

// add friend button lol ok

homepage.post('/addfriend', async (req,res,next)=> {
    console.log("all good")
    const reciverusername = req.body.username
    const ruser = await checkuser(reciverusername)

   // already friend and already recieved request so chec the user in friends and ? in requests 
   console.log()
   if (!ruser || ruser.id == req.user[0].id) {
       return res.json({message: "Double Check the username!"})
    } else {
        const data = await checkiffriend(ruser.id, req.user[0].id)
        const dasta = await checkifreq(ruser.id, req.user[0].id)
        if (data.length || dasta.length) {
            console.log('sdaljfkasfjas')
            return res.json({message: "Double Check the username!"})}
          console.log('senderid', req.user[0].id, ruser.id)
    const result = await SendReq(req.user[0].id, ruser.id )
    if (!result.success) {return res.json({message: result.message})} else if (result.success) {
        return res.json({message: `Your friend request to ${reciverusername} was successfully sent`})
    }

    }
   
})


// accept and reject request too ok 

homepage.post('/acceptreq',async (req,res)=>{
     const senderuserid = req.body.userid
     const accepterid = req.user[0].id
     await AcceptReq(accepterid, senderuserid)
     res.json({message: "Added Successfully"})
})

homepage.post('/rejectreq', async (req, res)=> {
    const senderuserid = req.body.userid
     const accepterid = req.user[0].id
     await RejectReq(accepterid, senderuserid)
     res.json({message: "Rejected Successfully"})

})
homepage.post('/cancelreq', async (req, res)=> {
    const senderuserid = req.body.userid
     const accepterid = req.user[0].id
     await CancelReq(accepterid, senderuserid)
     res.json({message: "Cancelled Successfully"})
})


homepage.post('/removefr', async (req,res)=> {
    const user = req.user[0].id
    const fr = req.body.userd
    console.log('body', req.body)
    console.log('fr', fr)
    await removefriend(user, fr)
    res.json({message: "Friend Removed"})
})



module.exports = homepage