import axios from 'axios'

export const fetchPokemons = () => {
  return dispatch => {
    return axios.get('http://pokeapi.co/api/v2/pokemon?limit=15')
      .then(response => {
        if (response.data.results && response.data.results.length !== 0) {
          response.data.results.forEach(pokemon => {
            return axios.get(pokemon.url)
              .then(response2 => {
                dispatch(addPokemon(response2))
                return response2
              })
          })
        };
      });
  }
};

export const addPokemon = (pokemon) => ({
  type: 'ADD_POKEMON',
  pokemon
});

export const changeFilters = (name, value, checkbox) => ({
  type: 'FILTER_POKEMONS',
  name,
  value,
  checkbox
});

export const changeGroups = (name) => ({
  type: 'GROUP_POKEMONS',
  name
});