const initState = {
  currentHeightClass: 0,
  currentTypeClass: '',
  currentWeightClass: {
    firstCheckbox: false,
    secondCheckbox: false,
    thirdCheckbox: false
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'FILTER_POKEMONS':
      if (action.checkbox) return {
        ...state,
        currentWeightClass: {
          ...state.currentWeightClass,
          [action.name]: action.value
        }
      }

      return {
        ...state,
        [action.name]: action.value
      }
    case 'GROUP_POKEMONS':
      if (action.name === 'first') return {
        ...state,
        currentHeightClass: 1,
        currentWeightClass: { firstCheckbox: true, secondCheckbox: false, thirdCheckbox: false },
        currentTypeClass: 'bug'
      }
      if (action.name === 'second') return {
        ...state,
        currentHeightClass: 2,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: true, thirdCheckbox: false },
        currentTypeClass: 'poison'
      }
      if (action.name === 'third') return {
        ...state,
        currentHeightClass: 3,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
        currentTypeClass: ''
      }
      return {
        ...state,
        currentHeightClass: 0,
        currentWeightClass: { firstCheckbox: false, secondCheckbox: false, thirdCheckbox: true, },
        currentTypeClass: 'flying'
      }
    default:
      return state;
  }
}