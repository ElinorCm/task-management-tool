export const CREATE_CARDS_INPUT_VALUE = 'CREATE_CARDS_INPUT_VALUE';
export const CREATE_CARDS_IS_OPEN = 'CREATE_CARDS_IS_OPEN';
export const CREATE_LISTS_INPUT_VALUE = 'CREATE_LISTS_INPUT_VALUE';
export const CREATE_LISTS_IS_OPEN = 'CREATE_LISTS_IS_OPEN';

export const createCardsInputValue = (id) => ({
  type: CREATE_CARDS_INPUT_VALUE,
  id,
});

export const createisCardFormOpen = (id) => ({
  type: CREATE_CARDS_IS_OPEN,
  id,
});

export const createListsInputValue = (id) => ({
  type: CREATE_LISTS_INPUT_VALUE,
  id,
});

export const createisListFormOpen = (id) => ({
  type: CREATE_LISTS_IS_OPEN,
  id,
});
