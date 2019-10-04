/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const getCard = async url => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

// axios.get('https://api.github.com/users/dswhitely1').then(res => console.log(res.data)).catch(err=>console.log(err));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createGitHubCard (data) {
  const gitHubCard = document.createElement('div');
  const gitHubImage = document.createElement('img');
  const gitHubCardInfo = document.createElement('div');
  const gitHubName = document.createElement('h3');
  const gitHubUsername = document.createElement('p');
  const gitHubLocation = document.createElement('p');
  const gitHubProfile = document.createElement('p');
  const gitHubProfileLink = document.createElement('a');
  const gitHubFollowers = document.createElement('p');
  const gitHubFollowing = document.createElement('p');
  const gitHubBio = document.createElement('p');

  gitHubImage.setAttribute('src', data.avatar_url);
  gitHubCard.appendChild(gitHubImage);
  gitHubName.textContent = data.name;
  gitHubUsername.textContent = data.login;
  gitHubLocation.textContent = data.location;
  gitHubProfile.textContent = 'Profile: ';
  gitHubProfileLink.textContent = data.html_url;
  gitHubProfileLink.setAttribute('href', data.html_url);
  gitHubFollowers.textContent = `Followers: ${data.followers}`;
  gitHubFollowing.textContent = `Following: ${data.following}`;
  gitHubBio.textContent = `Bio: ${data.bio}`;

  gitHubProfile.appendChild(gitHubProfileLink);
  gitHubCardInfo.appendChild(gitHubName);
  gitHubCardInfo.appendChild(gitHubUsername);
  gitHubCardInfo.appendChild(gitHubLocation);
  gitHubCardInfo.appendChild(gitHubProfile);
  gitHubCardInfo.appendChild(gitHubFollowers);
  gitHubCardInfo.appendChild(gitHubFollowing);
  gitHubCardInfo.appendChild(gitHubBio);
  gitHubCard.appendChild(gitHubCardInfo);

  gitHubCard.classList.add('card');
  gitHubCardInfo.classList.add('card-info');
  gitHubName.classList.add('name');
  gitHubUsername.classList.add('username');

  return gitHubCard;

}

let cardData;
const cardsDiv = document.querySelector('.cards');
getCard('https://api.github.com/users/dswhitely1')
  .then(data => cardsDiv.appendChild(createGitHubCard(data)))
  .catch(err => console.log(err.response));

getCard('https://api.github.com/users/dswhitely1/followers')
  .then(data => data.forEach(follower => getCard(follower.url)
    .then(eachFollower => cardsDiv.appendChild(createGitHubCard(eachFollower)))
    .catch(err => console.log(err.response))))
  .catch(err => console.log(err.response));
/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
