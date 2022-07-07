export const CREATE_LISTS_INPUT_VALUE = 'CREATE_LISTS_INPUT_VALUE';
export const CREATE_CARDS_INPUT_VALUE = 'CREATE_CARDS_INPUT_VALUE';

export const createListsInputValue = (id) => ({
  type: CREATE_LISTS_INPUT_VALUE,
  id,
});

export const createCardsInputValue = (id) => ({
  type: CREATE_CARDS_INPUT_VALUE,
  id,
});
