import lists from 'src/data/lists';
import cards from 'src/data/cards';
import tags from 'src/data/tags';

import {
  CREATE_CARDS_INPUT_VALUE,
  CREATE_CARDS_IS_OPEN,
  CREATE_LISTS_INPUT_VALUE,
  CREATE_LISTS_IS_OPEN,
} from 'src/store/actions';

/* eslint-disable default-param-last */
const initialState = {
  lists: [...lists],
  cards: [...cards],
  tags: [...tags],
  listsInputValue: [],
  cardsInputValue: [],
  isListFormOpen: [],
  isCardFormOpen: [],
};

const reducer = (state = initialState, action) => {
  // switch case pour réagir a nos actions
  switch (action.type) {
    case CREATE_CARDS_INPUT_VALUE:
      return {
        ...state,
        cardsInputValue: [...state.cardsInputValue, { id: action.id, inputValue: '' }],
      };
    case CREATE_CARDS_IS_OPEN:
      return {
        ...state,
        isCardFormOpen: [...state.isCardFormOpen, { id: action.id, isFormOpen: false }],
      };
    case CREATE_LISTS_INPUT_VALUE:
      return {
        ...state,
        listsInputValue: [...state.listsInputValue, { id: action.id, inputValue: '' }],
      };
    case CREATE_LISTS_IS_OPEN:
      return {
        ...state,
        isListFormOpen: [...state.isListFormOpen, { id: action.id, isFormOpen: false }],
      };
    default:
      return state;
  }
};

export default reducer;
