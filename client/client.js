console.log('Hello World');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading')
const tweetElement = document.querySelector('.tweets');
const API_URL = 'http://localhost:5000/tweets'

loadingElement.style.display = '';

listAllTweets();

form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    //get data from tag 
    const formData = new FormData(form);
    const name =  formData.get('name');
    const content = formData.get('content');
   
    //place data into an object
    const tweet = {
        name,
        content
    };
    
    form.style.display = 'none'
    loadingElement.style.display = '';
 
    //send object data as json to server
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdTweet => {
        form.reset();
        form.style.display = '';
        listAllTweets();
      });
});

function listAllTweets() {
    tweetElement.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(tweets => {
        console.log(tweets);
        tweets.reverse();
        tweets.forEach(tweet => {
            const div = document.createElement('div');

            const header = document.createElement('h3');
            header.textContent = tweet.name;

            const contents = document.createElement('p');
            contents.textContent = tweet.content;
          
            const date = document.createElement('small');
            Date.textContent = new Date(tweet.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);           

            tweetElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
    });
}