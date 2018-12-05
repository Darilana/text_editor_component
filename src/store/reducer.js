const initialState = {
  text: '',
  synonymsMap: {},
  isModalOpen: false,
  selectedText: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        text: action.payload
      };
    case 'SET_SYNONYMS':
      return {
        ...state,
        synonymsMap: {
          ...state.synonymsMap,
          [action.payload.query]: [...action.payload.synonyms]
        }
      };
    case 'MODAL_TOGGLE':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case 'SET_SELECTED_TEXT':
      return {
        ...state,
        selectedText: action.payload
      };
    default:
      return state
  }
};

export default reducer;