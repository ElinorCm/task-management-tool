import lists from 'src/data/lists';
import cards from 'src/data/cards';
import tags from 'src/data/tags';

import {
  CREATE_LISTS_INPUT_VALUE,
  CREATE_CARDS_INPUT_VALUE,
} from 'src/store/actions';

/* eslint-disable default-param-last */
const initialState = {
  lists: [...lists],
  cards: [...cards],
  tags: [...tags],
  listsInputValue: [],
  cardsInputValue: [],
};

const reducer = (state = initialState, action) => {
  // switch case pour réagir a nos actions
  switch (action.type) {
    case CREATE_LISTS_INPUT_VALUE:
      return {
        ...state,
        listsInputValue: [...state.listsInputValue, { [action.id]: '' }],
      };
    case CREATE_CARDS_INPUT_VALUE:
      return {
        ...state,
        cardsInputValue: [...state.cardsInputValue, { [action.id]: '' }],
      };
    default:
      return state;
  }
};

export default reducer;
