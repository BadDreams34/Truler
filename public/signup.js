const button = document.querySelector('button')
button.addEventListener('click', async (e)=> {
    e.preventDefault()
    const email = document.querySelector('#email').value
const password = document.querySelector('#password').value 
const username = document.querySelector('#username').value 
const confirmpass = document.querySelector('#confirpass').value

const emailv = document.querySelector('#email')
const emaillb = document.querySelector('#emaillb')
const passwordv = document.querySelector('#password')
const passwordlb = document.querySelector('#passwordlb')
const passwordvlb = document.querySelector('#passwordvlb')

const usernamev = document.querySelector('#username')
const usernamelb = document.querySelector('#usernamelb')


if (emailv.validity.typeMismatch) {
    emaillb.innerHTML = 'EMAIL<span style="color:red;" aria-label="CHECK YOUR EMAIL">Incorrect Email</span'
    emaillb.setAttribute('style', 'color:red;')
} 

if (passwordv.validity.typeMismatch) {
    passwordlb.innerHTML = 'PASSWORD<span style="color:red;" aria-label="CHECK YOUR PASSWORD">Incorrect Password</span'
    passwordlb.setAttribute('style', 'color:red;')
}
if (usernamev.validity.patternMismatch) {
    usernamelb.innerHTML = 'USERNAME<span style="color:red;" aria-label="username can only contain numbers, period or _">username can only contain numbers, period or _</span'
    usernamelb.setAttribute('style', 'color:red')
}

if (password !== confirmpass) {
     passwordlb.innerHTML = 'PASSWORD<span style="color:red;" aria-label="PASSWORD DOESNT MATCH">Incorrect Password</span'
     passwordvlb.innerHTML = 'PASSWORD<span style="color:red;" aria-label="PASSWORD DOESNT MATCH">Incorrect Password</span'
     passwordlb.setAttribute('style', 'color:red')
     passwordvlb.setAttribute('style', 'color:red')
} else {
    const body = {email, password, username}
const response = await fetch('/signup', {method:"POST", body: JSON.stringify(body), headers : {"Content-Type": "application/json"}})
 if (response.ok) {
    const message = await response.json()
    console.log(message)
    if (message.message === 'Username Already Exists') {
        usernamelb.innerHTML = 'USERNAME<span style="color:red;">Username Already Exists</span'
        usernamelb.setAttribute('style', 'color:red')

    } else if (message.message === 'Email Already Exists') {
         emaillb.innerHTML = 'EMAIL<span style="color:red;">Email Already Exists</span'
    emaillb.setAttribute('style', 'color:red;')
    } else if (message.message === 'Signup successful') {
        console.log('sucess')
        window.location.href= './index.html'
    } 
 }
}
})
