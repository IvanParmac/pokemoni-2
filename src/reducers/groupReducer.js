const initState = {
  currentGroupClass: 0,
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'GROUP_POKEMONS':
      if (action.name === 'first') return {
        currentGroupClass: 1
      }
      if (action.name === 'second') return {
        currentGroupClass: 2
      }
      if (action.name === 'third') return {
        currentGroupClass: 3
      }
      return {
        currentGroupClass: 4
      }
    default:
      return state;
  }
}