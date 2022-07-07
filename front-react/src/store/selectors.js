/* eslint-disable import/prefer-default-export */

export function filterCardsbyListId(cards, listId) {
  const requiredCards = cards.filter((testedCard) => testedCard.list_id === listId);
  return requiredCards;
}

export function findIsOpenbyListId(lists, isOpen, id) {
  let requiredIsOpen;
  if (lists.length === isOpen.length) {
    requiredIsOpen = isOpen.find((x) => x.id === id).isFormOpen;
  }
  return requiredIsOpen;
}

export function findIsOpenbyCardId(cards, isOpen, id) {
  let requiredIsOpen;
  if (cards.length === isOpen.length) {
    requiredIsOpen = isOpen.find((x) => x.id === id).isFormOpen;
  }
  return requiredIsOpen;
}
