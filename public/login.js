const button = document.querySelector("button");

button.addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const emlb = document.querySelector('#emlb')
  const pslb = document.querySelector('#pslb')
  const emailv = document.querySelector("#email")
  const passwordv = document.querySelector("#password")

  if (emailv.validity.typeMismatch) {
    emlb.innerHTML = 'EMAIL <span>CHECK YOUR EMAIL</span>'
    emlb.setAttribute('style', 'color:red;')
  }
  if (!passwordv.validity.valid) {
   pslb.innerHTML = 'EMAIL <span>CHECK YOUR PASSWORD</span>'
    pslb.setAttribute('style', 'color:red;')
  }

  const body = { email, password };
  const response = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: { "Content-Type": "application/json" ,},
  });
  
    const data = await response.json();
    console.log(data.message);
    if (data.message === 'Email or Password is incorrect') {
      emlb.innerHTML = 'EMAIL <span>Email or Password is incorrect</span>'
    pslb.setAttribute('style', 'color:red;')
    pslb.innerHTML = 'EMAIL <span>Email or Password is incorrect</span>'
    emlb.setAttribute('style', 'color:red;')
    } else {
      window.location.href = './homepage.html'
    }
  } 
);