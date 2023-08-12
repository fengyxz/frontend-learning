let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 0 },
]
// N^2做法
function getTreeList1(arr){
  const list = [];

  arr.forEach(element => {
    //获取以当前节点为父节点的子节点
    const children_arr = arr.filter(child => child.pid === element.id);
    //将子节点放入当前节点
    if(children_arr.length > 0){
      element.children =children_arr;
    }
    //如果pid为0就是根节点
    if(element.pid === 0){
      list.push(element);
    }
  })
  return list;
}

console.log(getTreeList1(arr));

// N 做法
function getTreeList2(arr){
  const list = [];
  const hashmap = {};

  for(let i = 0; i<arr.length; i++){
    let pid = arr[i].pid;
    let id = arr[i].id;

    if(!hashmap[id]){
      hashmap[id] = {children:[]}
    }

    hashmap[id] = {...arr[i],children:hashmap[id].children};

    if(pid === 0){
      list.push(hashmap[id]);
    }else{
      if(!hashmap[pid]){
        hashmap[pid] = {
          children:[]
        }
      }

      hashmap[pid].children.push(hashmap[id])
    }
  }
  return list;
}

const b = getTreeList2(arr);
console.log(b)