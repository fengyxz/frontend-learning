//将一个树形结构的数组对象（其实就是父节点有子节点）转换成列表
//本质的算法思想是dfs，深度遍历即可完成
function treeToList(data){
  let res = [];
  const dfs = (tree) => {
    tree.forEach( item => {
      const {id,name} = item;
      res.push({id,name});
      //遍历终止条件是没有children
      if(item.children){
        dfs(item.children)
      }
    })
  }
  dfs(data);
  return res;
}

const data = [
  {
      id: '1',
      name: '父节点1',
      children: [
          {
              id: '1-1',
              name: '子节点1-1',
              children: [
                  {
                      id: '1-1-1',
                      name: '子节点1-1-1'
                  },
                  {
                      id: '1-1-2',
                      name: '子节点1-1-2'
                  }
              ]
          }
      ]
  },
  {
      id: '2',
      name: '父节点2',
      children: [
          {
              id: '2-1',
              name: '子节点2-1'
          }
      ]
  }
]

const res = treeToList(data);
console.log(res);