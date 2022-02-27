const chatForm = document.getElementById("chat-form");
const chatHistory = document.querySelector('.chat-history');
console.log(chatForm);

const socket = io();
// message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);


  // Scroll to the most recent message
  chatHistory.scrollTop = chatHistory.scrollHeight;
});

// message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);

  // clear message field
  e.target.elements.msg.value='';
//   e.target.elements.msg.focus();
  
});

// output message to DOM
function outputMessage(message){
    const li = document.createElement('li');
    li.classList.add('clearfix');
    li.innerHTML=`
        <div class="message-data ">
            <span class="message-data-time">10:17 AM, Today</span>
        </div>
        <div class="message other-message">
            ${message}
        </div>
    `;
    document.querySelector('.chat-history ul').appendChild(li);
}