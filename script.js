const URL = 'https://cemit-basic-api.herokuapp.com';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const messageInput = document.querySelector('#message');
  const nameInput = document.querySelector('#name');
  const freedomWallDiv = document.querySelector('#freedom_wall');
  const postButton = document.querySelector('#button');

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (nameInput.value.length > 0 && messageInput.value.length > 0) {
      // Submit form

      postButton.innerHTML = "Posting...";

      postMesasge(nameInput.value, messageInput.value)
      .then(data => {
          console.log(data);
          postButton.innerHTML = "Post";
          loadMessagesIntoDOM(freedomWallDiv);
        });

      
    } 
  });


  loadMessagesIntoDOM(freedomWallDiv);
});



const postMesasge = async (name, message) => {
  data = {
    name,
    message
  };

  const response = await fetch(URL + '/freedom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

const fetchMessages = async () => {
  const response = await fetch(URL + '/freedom', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}


const loadMessagesIntoDOM = (freedomWallDiv) => {
  fetchMessages().then(data => {
    freedomWallDiv.innerHTML = "";
    for (let i = data.length - 1; i >= 0; i--) {
        freedomWallDiv.appendChild(createEntryDOM(data[i].name, data[i].message, data[i].createdAt));   
      }
  });
}


const createEntryDOM = (name, message, date) => {
  const div = document.createElement('DIV');
        div.classList.add('entry');
  
  const nameP = document.createElement('P');
        nameP.classList.add('author');
        nameP.innerHTML = "by: " + name; 

  const messageP = document.createElement('DIV');
        messageP.classList.add('message');
        messageP.innerHTML = message;

  const dateP  = document.createElement('P');
        dateP.classList.add('date');
        dateP.innerHTML = moment(date).format('LLL') + " | " + moment(date).fromNow();

  
  div.appendChild(messageP);
  div.appendChild(nameP);
  div.appendChild(dateP);

  return div;
}