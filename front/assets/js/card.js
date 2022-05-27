const cardModule = {

    showAddCardModal: function (event) {
        // je récupère le list_id
        const listId = event.target.closest("[data-list-id]").dataset.listId;

        // je reset l'input du nom
        document.querySelector("#addCardModal input[name='name']").value = "";

        // je mets à jour mon champs input
        document.querySelector("#addCardModal input[type='hidden']").value = listId;

        document.querySelector('#addCardModal').classList.add('is-active');
    },

    async handleAddCardForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        const response = await fetch(`http://localhost:3000/cards/create`, {
            method: "POST", // j'envoie en POST pour plus de sécurité
            body: formData
        });

        if (response.ok) {
            const card = await response.json();
            cardModule.makeCardInDOM(card);
        }
        else {
            console.log(response);
        }

    },

    makeCardInDOM: function ({ name, id, list_id }) {

        let templateCard = document.querySelector('#card-template').content;
        const templateCardHTML = document.importNode(templateCard, true);

        templateCardHTML.querySelector('.card-name').textContent = `${name}`;

        templateCardHTML.querySelector('[data-card-id="{card.id}"]').setAttribute("data-card-id", `${id}`);

        // On met à jour l'attribut hidden
        templateCardHTML.querySelector('[name="card_id"]').value = id;

        // On ajoute les events listener
        templateCardHTML.querySelector('.has-text-primary').addEventListener('click', function () { cardModule.showUpdateCardForm(id) });
        templateCardHTML.querySelector('.has-text-danger').addEventListener('click', function () { cardModule.showDeleteCardModal(id) });
        templateCardHTML.querySelector('.update-card-form').addEventListener('submit', cardModule.handleUpdateCardForm);

        const cardContainerElement = document.querySelector(`[data-list-id="${list_id}"] .card-container`);
        cardContainerElement.insertBefore(templateCardHTML, cardContainerElement.lastChild);

        app.closeModals();
    },

    showUpdateCardForm: function (id) {
        document.querySelector(`[data-card-id="${id}"] .card-name`).classList.toggle('is-hidden');
        document.querySelector(`[data-card-id="${id}"] form`).classList.toggle('is-hidden');
    },

    async handleUpdateCardForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        const response = await fetch(`http://localhost:3000/cards/update/${formData.get('card_id')}`, {
            method: "PATCH",
            body: formData
        });

        if (response.ok) {
            const card = await response.json();
            document.querySelector(`[data-card-id="${formData.get('card_id')}"] .card-name`).textContent = card.name;
            document.querySelector(`[data-card-id="${formData.get('card_id')}"] .card-name`).classList.remove('is-hidden');
            document.querySelector(`[data-card-id="${formData.get('card_id')}"] form`).classList.add('is-hidden');
        }
        else {
            console.log(response);
        }

    }, 

    showDeleteCardModal: function (id) {

        // Event listener
        document.querySelector('#deleteCardModal .delete-card-form').addEventListener('submit', cardModule.handleDeleteCardForm);

        // je mets à jour mon champs input
        document.querySelector("#deleteCardModal input[type='hidden']").value = id;

        document.querySelector('#deleteCardModal').classList.add('is-active');

    },

    async handleDeleteCardForm(event) {
        
        event.preventDefault(); 

        const formData = new FormData(event.target);

        const response = await fetch(`http://localhost:3000/cards/delete/${formData.get('card_id')}`, {
            method: "DELETE",
            body: formData
        });

        if (response.ok) {
            document.querySelector(`[data-card-id="${formData.get('card_id')}"]`).parentElement.removeChild(document.querySelector(`[data-card-id="${formData.get('card_id')}"]`)); 
            app.closeModals(); 
        }
        else {
            console.log(response);
        }

    }, 

    async deleteCard(id) {

        const formData = new FormData(); 

        formData.append('card_id', `${id}`); 

        const response = await fetch(`http://localhost:3000/cards/delete/${formData.get('card_id')}`, {
            method: "DELETE",
            body: formData
        });

        if (response.ok) {
            document.querySelector(`[data-card-id="${formData.get('card_id')}"]`).parentElement.removeChild(document.querySelector(`[data-card-id="${formData.get('card_id')}"]`)); 
        }
        else {
            console.log(response);
        }
    },

    async updateCardPosition(id, position) {

        const formData = new FormData(); 

        const card = await app.getCardFromAPI(id); 

        formData.append('card_id', `${id}`);
        formData.append('position', `${position}`);
        formData.append('list_id',`${card.list_id}`); 

        const response = await fetch(`http://localhost:3000/cards/update/${id}`, {
            method: "PATCH",
            body: formData
        });

        if (response.ok) {
            console.log(await response.json()); 
        } else {
            console.log(response); 
        }

    }

}