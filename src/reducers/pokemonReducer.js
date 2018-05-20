const initState = {
  pokemons: [],
  types: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_POKEMON':
      const newTypes = action.pokemon.data.types.map((type, index) => type.type.name)
      const allTypes = [...state.types, ...newTypes]
      return {
        ...state,
        pokemons: [...state.pokemons, action.pokemon],
        types: allTypes.filter((type, index, array) => array.indexOf(type) === index)
      }
    default:
      return state;
  }
}
