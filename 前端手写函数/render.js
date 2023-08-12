//字节一面算法题原题
//主要就是递归的写法，但是需要对浏览器操作dom熟悉
function _render(vnode) {
  //1. number -> string
  if(typeof vnode === 'number'){
    vnode = String(vnode);
  }
  //2. string -> text
  if(typeof vnode === 'string'){
    return document.createTextNode(vnode);
  }
  //3. normal dom
  const { tag, attrs={}, children=[]} = vnode;
  const dom = document.createElement(tag)
  //set attrs
  if(attrs) {
    //to iterate over
    Object.keys(attrs).forEach((key) => {
      dom.setAttribute(key, attrs[key]);
    });
  }
  //set children
  children.forEach(child => dom.appendChild(_render(child)))
  return dom;
}

const t = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}

const a = _render(t);
console.log(a);