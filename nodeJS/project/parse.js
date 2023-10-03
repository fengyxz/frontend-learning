var path = require('path');

function parseURL(root, url){
  var base, pathnames,parts;
  var index;
  parts = url.split(',');
  if(parts[0].indexOf('??') === -1){
    index = parts[0].lastIndexOf('/');
    let tmppart = parts[0].slice(0,index);
    index = tmppart.lastIndexOf('/');
    console.log(tmppart);
    base = parts[0].slice(0,index);
    parts[0] = parts[0].slice(index+1);
  }else{
    index = parts[0].indexOf('??');
    base = parts[0].slice(0,index);
    parts[0] = parts[0].slice(index+3);
  }
  
  pathnames = parts.map(function (value) {
      return path.join(root, base, value);
  });

  console.log(pathnames)
}

parseURL('xx','http://assets.example.com/foo/bar.js,foo/baz.js');