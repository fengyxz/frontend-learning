function filterItems(items,query){
  query = query.toLowerCase();
  return items.filter(item => 
    item.name.split(' ').some(word =>
      word.toLowerCase().srartsWith(query)
  ))
}