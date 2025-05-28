const initialState = [];

export default function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SONG':
      
      if (state.some(song => song.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];

    case 'REMOVE_SONG':
      return state.filter(song => song.id !== action.payload);

    default:
      return state;
  }
}