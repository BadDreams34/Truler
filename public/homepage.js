const friendsss = document.querySelector(".friends");
const profile = document.querySelector(".profile");
const input = document.querySelector("#friendusername");
const chats = document.querySelector(".chat");
const friends = document.querySelector(".friendss");
const nav = document.querySelector("nav");
const sendbtn = document.querySelector("#sendbtn");
const sendd = document.querySelector(".chas");
const frindarea = document.querySelector(".friendprofile");
const mainchat = document.querySelector(".mainchat");
const setting = document.querySelector('.setting')
const request = document.querySelector(".requests");
const leftpane = document.querySelector('.leftpane')

const isMobile = window.matchMedia("(max-width: 450px)");


window.addEventListener("load", async () => {

  leftpane.setAttribute('style', 'display:flex')

   
  const chatBox = document.querySelector(".chas");

  try {
    const response = await fetch("/home/allfriends", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result);
      const username = result.user.username;
      const h2 = document.createElement("h2");
      h2.textContent = username;
      profile.insertBefore(h2, setting);
      h2.classList.add("usern");
      const data = result.friends;
      for (let friend of data) {

        const friendname = friend.friend[0].username;
        
        const frienddiv = document.createElement("div");
        console.log(friend)
        const h4 = document.createElement("h4");
      
        h4.textContent = friendname;
        frienddiv.appendChild(h4);
        friendsss.appendChild(frienddiv);
        frienddiv.classList.add(friendname.replace(/\s+/g, '_'))
        frienddiv.classList.add("eachfrs");
        

           frienddiv.addEventListener("click", async () => {
         
           mainchat.setAttribute('style', 'display:flex');
          request.setAttribute("style", "display:none");
          chats.setAttribute("style", "display:flex;");
          friends.setAttribute("style", "display:none;");
          frindarea.setAttribute('style', "display:flex;")
          chats.classList.add('reschat')
          sendd.innerHTML = "";
          frindarea.innerHTML = "";

          if (isMobile.matches){
            leftpane.setAttribute('style', 'display:none')

          }
    
          const body = { userid: friend.friend[0].id }
         
          const response = await fetch("/chat/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
          });

          if (response.ok) {
            const result = await response.json();
            result.sort((a,b)=> Date.parse(a.sentAt) - Date.parse(b.sentAt))
       
            result.forEach((msg) => {
             
              const message = msg.text;
              const user = msg.sendername;
              
              
              const msgdiv = document.createElement("div");
              msgdiv.classList.add("msgdiv");
              const msgtxt = document.createElement("h5");
              msgtxt.textContent = message;
              const ser = document.createElement("h6");
              ser.textContent = user;
              msgtxt.classList.add("yes");
              ser.classList.add("no");
               if (user === username) {msgdiv.classList.add('walike')}
             
               const time = new Date(msg.sentAt).toLocaleTimeString('en-us', {hour12:true})
               const tim = document.createElement('h5')
               tim.classList.add('time')
               tim.textContent = time
              
              msgdiv.appendChild(ser);
               msgdiv.appendChild(tim)
              msgdiv.appendChild(msgtxt);
              
              sendd.appendChild(msgdiv);
            });

            chatBox.scrollTop = chatBox.scrollHeight;
                
            const h2 = document.createElement("h2");
            h2.textContent = friendname;
            h2.setAttribute('style', 'font-family:monospace;')
            const h4 = document.createElement('h4')
            h4.textContent = 'Bio'  
     
            h4.setAttribute('style', 'font-family:monospace; margin-left:9px; text-align: justify, width:50px;')
            const bio = document.createElement('h3')
            bio.setAttribute('style', 'font-family:monospace; margin-left:19px;color:grey;text-align: justify; width:250px;')
            bio.textContent = friend.friend[0].bio
            frindarea.appendChild(h2);
            frindarea.appendChild(h4)
            frindarea.appendChild(bio)
            const removefr = document.createElement("button");
            removefr.classList.add('rembtn')
            removefr.textContent = "Remove Friend";
            frindarea.appendChild(removefr);
            removefr.addEventListener("click", async () => {
              const boy = { userd: friend.friend[0].id }
              const response = await fetch("/home/removefr", {
                method: "POST",
                body: JSON.stringify(boy),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
              });
              if (response.ok) {
                const result = await response.json();
                window.location.reload()
            
              }
            });
          }
        
           sendbtn.addEventListener("click", send, {once:true} );   
       async function send() {
               console.log(friend)
          let messa = document.querySelector("#sendbox").value;
         
          const body = { text: messa, userid: friend.friend[0].id };
          const send = await fetch("/chat/send", {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const response = await send.json();
          console.log('friendname', friend.friend[0].username)
            const samebtn = document.querySelector(`.${friend.friend[0].username.replace(/\s+/g, '_')}`)
            samebtn.click() 
            document.querySelector("#sendbox").value = '';
            
        }
        //  sendbtn.removeEventListener('click', send)
        
       
       
        }
      
      
      );

       
      }
    } else {
      console.error("Server responded with error", data);
    }
  } catch (error) {
    console.error("Fetch failed", error);
  }
});

const addfriend = document.querySelector("#af");
addfriend.addEventListener("click", () => {
  request.setAttribute("style", "display:none");
  chats.setAttribute("style", "display:none;");
  friends.setAttribute("style", "display:block;");
});
 if (isMobile.matches){
            leftpane.setAttribute('style', 'display:none')

          }

const sendfriendreq = document.querySelector(".frndbtn");

sendfriendreq.addEventListener("click", async () => {
  const username = document.querySelector("#friendusername").value;
  const body = { username };
  const response = await fetch("/home/addfriend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const result = await response.json();

  const text = document.querySelector("#text");
  if (result.message === "Double Check the username!") {
    input.setAttribute("style", "border: 1px solid red;margin-top: 40px;");

    text.textContent = result.message;
    text.setAttribute(
      "style",
      "color: red; font-size: 13px; margin-left: 20px;margin-top: 40px;"
    );
  } else if (result.message === "Request Already Sent") {
    input.setAttribute("style", "border: 1px solid red; margin-top: 40px;");

    text.textContent = result.message;
    text.setAttribute(
      "style",
      "color: red; font-size: 13px; margin-left: 20px;margin-top: 40px;"
    );
  } else {
    input.setAttribute("style", "border: 1px solid green;margin-top: 40px;");

    text.textContent = result.message;
    text.setAttribute(
      "style",
      "color: green; font-size: 13px; margin-left: 20px; margin-top: 40px;"
    );
  }
});

const requests = document.querySelector("#req");
const divr = document.querySelector(".divr");
const divs = document.querySelector(".divs");
requests.addEventListener("click", async () => {
  divr.innerHTML = '<h4 class="subh">Recieved</h4><div class="dir"></div>';
  divs.innerHTML = '<h4 class="subh">Sent</h4><div class="dis"></div>';
  const dir = document.querySelector('.dir')
  const dis = document.querySelector('.dis')
  chats.setAttribute("style", "display:none;");
  friends.setAttribute("style", "display:none;");
  request.setAttribute("style", "display:flex");
  const response = await fetch("/home/requests", {
    method: "GET",
    credentials: "include",
  });
   if (isMobile.matches){
            leftpane.setAttribute('style', 'display:none')

          }
  if (response.ok) {
    const requests = await response.json();
    console.log("requests", requests);
    const recieved = requests.filter((req) => {
      console.log(req.relation === "recieved");
      return req.relation === "recieved";
    });
    console.log(recieved);
    if (recieved.length) {
      console.log("theere are recived requests", recieved);
      divr.setAttribute("style", "display:flex");

      recieved.forEach((req) => {
        const name = document.createElement("h4");
        name.textContent = req.username;
        name.classList.add("h4");
        const accept = document.createElement("button");
        const reject = document.createElement("button");
        accept.classList.add("acc");
        reject.classList.add("rej");
        accept.textContent = "Accept";
        reject.textContent = "Reject";
        accept.addEventListener("click", async () => {
          const body = { userid: req.senderid };

          const response = await fetch("/home/acceptreq", {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const result = await response.json();
          console.log(result);
          window.location.reload();
        });
        reject.addEventListener("click", async () => {
          const body = { userid: req.senderid };

          const response = await fetch("/home/rejectreq", {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const result = await response.json();
          console.log(result);
          window.location.reload();
        });
        dir.appendChild(name);
        dir.appendChild(accept);
        dir.appendChild(reject);
        console.log("done ok ");
      });
    }

    const sent = requests.filter((req) => {
      return req.relation == "sent";
    });
    if (sent.length) {
      console.log("theere are sent requests", sent);
      divs.setAttribute("style", "display:flex");

      sent.forEach((req) => {
        const name = document.createElement("h4");
        name.classList.add("h4");
        name.textContent = req.username;
        const Cancel = document.createElement("button");
        Cancel.textContent = "Cancel";
        Cancel.classList.add("can");
        Cancel.addEventListener("click", async () => {
          const body = { userid: req.recieverid };
          const response = await fetch("/home/cancelreq", {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          window.location.reload();
        });

        dis.appendChild(name);
        dis.appendChild(Cancel);
      });
    }
  }
});
