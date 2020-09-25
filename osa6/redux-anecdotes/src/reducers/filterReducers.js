export const filterReducer = (state = null, action) => {
  switch(action.type) {
    case 'FILTER':
      return action.text;
    default:
      return state;
  }
}

export const filterAnecdotes = (text) => {
  return {
    type: 'FILTER',
    text: text
  }
}