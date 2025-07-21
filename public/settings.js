const usernamebtn = document.querySelector('.usernameedit')
const emailbtn = document.querySelector('.emailedit')
const account = document.querySelector('.account')
const logoutbtn = document.querySelector('.logout')
const username = document.querySelector('.username')
const bio = document.querySelector('.bio')
const use = document.querySelector('.use')
const useb = document.querySelector('.useb')
const bios = document.querySelector('.bios')
const goback = document.querySelector('.goback')
window.addEventListener('load', async ()=> {
   

const response = await fetch("/home/allfriends", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
        const result = await response.json()
        console.log(result.user)
        username.textContent = result.user.username
        username.classList.remove('load')
        document.querySelector('.bio').value = result.user.bio
    }
})



goback.addEventListener('click', ()=> {
    window.location.href = 'http://localhost:6050/homepage.html'
})


bio.addEventListener('input', ()=>{
   
    bios.classList.add('afteruse')
})




usernamebtn.addEventListener('click', ()=>{
    logoutbtn.classList.add('logoutshow')
    use.classList.add('afteruse')
    useb.classList.add('afteruse')
})


useb.addEventListener('click', async ()=> {

    const useval = use.value
    const body = {username:useval}
    const response = await fetch('/account/usrchange', {method:"POST", body: JSON.stringify(body), headers:{"Content-Type": "application/json"}, credentials:"include"})

    console.log(response.ok)
    if (response.ok) {
        window.location.reload()
    }
})


bios.addEventListener('click', async ()=>{
    const bioval = document.querySelector('.bio').value
    const body = {bio : bioval}
    const response = await fetch('/account/biochange', {method:"POST", body: JSON.stringify(body), headers:{"Content-Type": "application/json"}, credentials:"include" })
 if (response.ok) {
    window.location.reload()
    }
})


logoutbtn.addEventListener('click', async ()=> {
   const response = await fetch('/account/logout', {method: "GET", credentials:"include"})
   if (response.ok) {
    window.location.href = '/'
   }
   
})