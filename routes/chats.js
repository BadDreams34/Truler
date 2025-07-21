const {Router} = require('express');
const chat = Router()
const {sendMessages, messages} = require('../queries')


chat.post('/chats', async (req, res)=>{
    const user2id = req.body.userid
    const message = await messages(req.user[0].id,user2id )
    return res.json(message)

})


chat.post('/send', async (req,res)=>{
    const reciverfriend = req.body.userid;
    const sent = await sendMessages(req.body.text, req.user[0].id, reciverfriend, req.user[0].username)
    return res.json('ok')
})

module.exports = chat;