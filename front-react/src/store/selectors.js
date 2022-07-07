/* eslint-disable import/prefer-default-export */
export function findCardsbyListId(cards, listId) {
  const requiredCards = cards.filter((testedCard) => testedCard.list_id === listId);
  return requiredCards;
}
