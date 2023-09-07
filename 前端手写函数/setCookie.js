function setCookie(name, value, options = {}){
  options = {
    path:'/',
    ...options
  }

  if(options.expires instanceof Date){
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for(let optionKey in options){
    updatedCookie += ";" + optionKey;
    let optionValue = options[optionKey];
    if(optionKey !== true){
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name){
  setCookie(name,"",{
    "max-age":-1
  })
}