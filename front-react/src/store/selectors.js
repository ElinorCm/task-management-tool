/* eslint-disable import/prefer-default-export */

export function filterCardsbyListId(cards, listId) {
  const requiredCards = cards.filter((testedCard) => testedCard.list_id === listId);
  return requiredCards;
}

export function findIsOpenbyListId(lists, listsInput, listId) {
  if (listsInput.length === lists.length) {
    return listsInput.find((testedList) => testedList.id === listId).isOpen;
  }
  return false;
}

export function findIsOpenbyCardId(cards, cardsInput, cardId) {
  if (cardsInput.length === cards.length) {
    return cardsInput.find((testedList) => testedList.id === cardId).isOpen;
  }
  return false;
}

export function findInputValuebyListId(lists, listsInput, listId) {
  if (listsInput.length === lists.length) {
    return listsInput.find((testedList) => testedList.id === listId).inputValue;
  }
  return '';
}
