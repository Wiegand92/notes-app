const filters = {
  text: '',
  sortBy: '',
}

const getFilters = () => filters

const setFilters = (newFilters) => {
  const { text, sortBy } = newFilters
  if(text){
    filters.text = text
  }
  if(sortBy){
    filters.sortBy = sortBy
  }
}

export { getFilters, setFilters }