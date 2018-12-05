import getMockText from './../text.service';

export const setText = payload => ({
  type: 'SET_TEXT',
  payload
});

const setSynonyms = payload => ({
  type: 'SET_SYNONYMS',
  payload
});

const setSelectedText = payload => ({
  type: 'SET_SELECTED_TEXT',
  payload
});

export const toggleModal = () => ({
  type: 'MODAL_TOGGLE'
});

export const fetchText = () => dispatch => getMockText()
  .then(text => dispatch(setText(text)));

export const fetchSynonyms = selection => dispatch => {
  dispatch(setSelectedText(selection));
  fetch(`https://api.datamuse.com/words?rel_syn=${selection}`)
    .then(response => response.json())
    .then(synonyms => {
      dispatch(setSynonyms({ query: selection, synonyms }));
    })
};
