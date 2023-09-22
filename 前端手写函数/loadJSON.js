function loadJson(url){
  return fetch(url)
    .then(response => response.json()); 
}

function loadGithubUser(name){
  return loadJson(`https://github.com/${name}`);
}

function showAvatar(githubUser){
  return new Promise(function(resolve, reject){
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "avatar";
    document.body.appendChild(img);

    setTimeout(() => {
      img.remove();
      img.resolve(githubUser)
    },3000)
  })
}

loadJson('...')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished ${githubUser.name}`));

  //作为一个好的做法，异步行为应该始终返回一个 promise。这样就可以使得之后我们计划后续的行为成为可能。即使我们现在不打算对链进行扩展，但我们之后可能会需要。