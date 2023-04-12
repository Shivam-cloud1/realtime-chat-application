
var socket = io()

let name;
let textarea = document.querySelector("#textarea")

let message_area = document.querySelector(".message_area")

do {
    name = prompt("please enter your name")
} while (!name);

textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
    
})
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    textarea.value = ""
    appendMessage(msg, "outgoing")
    socket.emit("sendmessage", msg)
    
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, "message")

    let markup = `     
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    message_area.appendChild(mainDiv)
}

socket.on("sendmessage", (data) => {
    appendMessage(data,"incoming")
    console.log("bbj", data)
})

function toptobottom(){
    
}
// // connection with server
// socket.on('connect', function(){
// console.log('Connected to Server')

// });

// // message listener from server
// socket.on('newMessage', function(message){
// console.log(message);
// });

// // emits message from user side
// socket.emit('createMessage', {
// to:'john@ds',
// text:'what kjkljd'
// });

// // when disconnected from server
// socket.on('disconnect', function(){
// console.log('Disconnect from server')
// });

