export const CREATE_CARDS_ATTRIBUTES = 'CREATE_CARDS_ATTRIBUTES';
export const CREATE_CARDS_IS_OPEN = 'CREATE_CARDS_IS_OPEN';
export const CREATE_LISTS_ATTRIBUTES = 'CREATE_LISTS_ATTRIBUTES';
export const CREATE_LISTS_IS_OPEN = 'CREATE_LISTS_IS_OPEN';
export const TOGGLE_LIST_FORM = 'TOGGLE_LIST_FORM';

export const createcardsAttributes = (id) => ({
  type: CREATE_CARDS_ATTRIBUTES,
  value: [
    {
      id,
      inputValue: '',
      isOpen: false,
    },
  ],
});

export const createisCardFormOpen = (id) => ({
  type: CREATE_CARDS_IS_OPEN,
  id: `${id}`,
});

export const createlistsAttributes = (id) => ({
  type: CREATE_LISTS_ATTRIBUTES,
  value: [
    {
      id,
      inputValue: '',
      isOpen: false,
    },
  ],
});

export const createisListFormOpen = (id) => ({
  type: CREATE_LISTS_IS_OPEN,
  id: `${id}`,
});

export const toggleListForm = (id) => ({
  type: TOGGLE_LIST_FORM,
  id,
});
