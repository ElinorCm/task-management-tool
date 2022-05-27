var app = {


  init: function () {
    console.log('app.init !');
    app.getListsFromAPI();
    app.addListenerToActions();
    app.getTagsFromAPI(); 
    listModule.addListDragAndDrop();
  },

  async getListsFromAPI() {

    const response = await fetch("http://localhost:3000/lists");

    if (response.ok) {
      lists = await response.json();
      lists.forEach(list => {
        listModule.makeListInDOM(list);
        list.cards.forEach(card => cardModule.makeCardInDOM(card));
      });

    }
    else {
      console.log(response);
    }

  },

  async getListCardsFromAPI(id) {

    const response = await fetch(`http://localhost:3000/lists/${id}/cards`);

    if (response.ok) {
      const list = await response.json();
      return list;
    } else {
      console.log(response);
    }

  },

  async getTagsFromAPI() {

    const response = await fetch("http://localhost:3000/tags");

    if (response.ok) {
      const tags = await response.json(); 
      tags.forEach(tag => {
        tagModule.makeTagInDOM(tag);
      })
    }
    else {
      console.log(response);
    }

  }, 

  async getCardFromAPI(id) {

    const response = await fetch(`http://localhost:3000/cards/${id}`);

    if (response.ok) {
      const card = await response.json();
      return card;
    } else {
      console.log(response);
    }

  },

  addListenerToActions: function () {

    // Lists events 
    document.querySelector('#addListButton').addEventListener('click', listModule.showAddListModal);
    document.querySelector('.add-list-form').addEventListener('submit', listModule.handleAddListForm);

    // Modal events
    document.querySelectorAll('.close').forEach(e => e.addEventListener('click', app.closeModals));

    // Cards events
    document.querySelector('.add-card-form').addEventListener('submit', cardModule.handleAddCardForm);

    // Tags events
    document.querySelector('#addTagButton').addEventListener('click', tagModule.showAddTagModal);
    document.querySelector('.add-tag-form').addEventListener('submit', tagModule.handleAddTagForm);

  },

  closeModals: function () {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('is-active');
    })
  },

};


// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
// document.addEventListener('DOMContentLoaded', app.init);
function runOnStart() {
  app.init()
}
if (document.readyState !== 'loading') {
  runOnStart();
}
else {
  document.addEventListener('DOMContentLoaded', function () {
    runOnStart()
  });
}