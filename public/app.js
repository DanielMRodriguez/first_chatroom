const app = document.getElementById('app');

const chatroom = `
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>`;

document.getElementById('enter-chat').addEventListener('click', () => {
  let nick = document.getElementById('nick');
  if (nick.value.trim() !== '') {
    app.innerHTML = chatroom;
    initChatRoom();
  } else {
    alert('Debes escribir un nick name');
  }
});

const initChatRoom = () => {
  var socket = io();
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  var messages = document.getElementById('messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
};
