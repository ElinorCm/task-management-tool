import lists from 'src/data/lists';
import cards from 'src/data/cards';
import tags from 'src/data/tags';

import {
  CREATE_CARDS_ATTRIBUTES,
  CREATE_LISTS_ATTRIBUTES,
} from 'src/store/actions';

/* eslint-disable default-param-last */
const initialState = {
  lists: [...lists],
  cards: [...cards],
  tags: [...tags],
  listsAttributes: [],
  cardsAttributes: [],
};

const reducer = (state = initialState, action) => {
  // switch case pour réagir a nos actions
  switch (action.type) {
    case CREATE_CARDS_ATTRIBUTES:
      return {
        ...state,
        cardsAttributes: [...state.cardsAttributes, ...action.value],
      };
    case CREATE_LISTS_ATTRIBUTES:
      return {
        ...state,
        listsAttributes: [...state.listsAttributes, ...action.value],
      };
    default:
      return state;
  }
};

export default reducer;
