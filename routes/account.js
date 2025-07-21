const {Router} = require('express')
const {changeusername, bio} = require('../queries')
const acc = Router()

acc.post('/usrchange', async (req, res)=>{
    const change = await changeusername(req.user[0].id,req.body.username)
    res.json('done')
})


acc.post('/biochange', async (req,res)=>{
    const bios = await bio(req.user[0].id,req.body.bio)
     res.json('done')

})


acc.get('/logout', async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'logged out' });
  });
});

module.exports = acc


