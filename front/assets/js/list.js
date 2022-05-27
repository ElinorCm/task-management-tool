const listModule = {

    showAddListModal: function () {
        const modal = document.querySelector('#addListModal');
        modal.classList.add('is-active');
    },

    async handleAddListForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        const response = await fetch(`http://localhost:3000/lists/create`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const list = await response.json();
            listModule.makeListInDOM(list);
        }
        else {
            console.log(response);
        }

    },

    makeListInDOM: function ({ name, id }) {

        // On clone le template
        let templateList = document.querySelector('#list-template').content;
        const templateListHTML = document.importNode(templateList, true);

        // On met à jour le clone avec le nom de la liste
        templateListHTML.querySelector('.list-name').textContent = `${name}`;

        // On met à jour l'attribut data-list-id
        templateListHTML.querySelector('[data-list-id="{list.id}"]').setAttribute("data-list-id", `${id}`);

        // On met à jour l'attribut hidden
        templateListHTML.querySelector('[name="list_id"]').value = id;

        // On ajoute les events listener 
        templateListHTML.querySelector(".add-card-button").addEventListener("click", cardModule.showAddCardModal);
        templateListHTML.querySelector('.list-name').addEventListener('dblclick', function () { listModule.showUpdateListForm(id) });
        templateListHTML.querySelector('.update-list-form').addEventListener('submit', listModule.handleUpdateListForm);
        templateListHTML.querySelector(".remove-list-button").addEventListener("click", function () { listModule.showDeleteListModal(id) });


        // On ajoute le drag and drop 
        const dropCard = templateListHTML.querySelector('.card-container');

        new Sortable(dropCard, {
            animation: 350,
            onEnd: function (evt) {
                cardModule.updateCardPosition(evt.item.getAttribute('data-card-id'), evt.newDraggableIndex + 1);
            }
        });

        // On ajoute au DOM
        document.querySelector('.card-lists').insertBefore(templateListHTML, document.querySelector('.card-lists').lastChild);

        app.closeModals();
    },

    addListDragAndDrop: function () {

        // Drag and drop lists 
        const dropLists = document.querySelector('.card-lists');

        let newPosition = [];

        new Sortable(dropLists, {
            animation: 350,
            onEnd: function (evt) {
                listModule.updateListPosition(evt.item.getAttribute('data-list-id'), evt.newDraggableIndex + 1);
            }
        });



    },

    showUpdateListForm: function (id) {
        document.querySelector(`[data-list-id="${id}"] .list-name`).classList.add('is-hidden');
        document.querySelector(`[data-list-id="${id}"] form`).classList.remove('is-hidden');
    },

    async handleUpdateListForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        if (formData.get("name") != document.querySelector(`[data-list-id="${formData.get('list_id')}"] .list-name`).textContent) {
            const response = await fetch(`http://localhost:3000/lists/update/${formData.get('list_id')}`, {
                method: "PATCH",
                body: formData
            });

            if (response.ok) {
                const list = await response.json();
                document.querySelector(`[data-list-id="${formData.get('list_id')}"] .list-name`).textContent = list.name;
                document.querySelector(`[data-list-id="${formData.get('list_id')}"] .list-name`).classList.remove('is-hidden');
                document.querySelector(`[data-list-id="${formData.get('list_id')}"] form`).classList.add('is-hidden');
            }
            else {
                console.log(response);
            }
        } else {
                            document.querySelector(`[data-list-id="${formData.get('list_id')}"] .list-name`).classList.remove('is-hidden');
                document.querySelector(`[data-list-id="${formData.get('list_id')}"] form`).classList.add('is-hidden');
        };

    },

    async updateListPosition(id, position) {

        const formData = new FormData();

        formData.append('list_id', `${id}`);
        formData.append('position', `${position}`);

        const response = await fetch(`http://localhost:3000/lists/update/${id}`, {
            method: "PATCH",
            body: formData
        });

        if (response.ok) {
            console.log(await response.json());
        } else {
            console.log(response);
        }

    },

    showDeleteListModal: function (id) {

        // Event listener
        document.querySelector('#deleteListModal .delete-list-form').addEventListener('submit', listModule.handleDeleteListForm);

        // je mets à jour mon champs input
        document.querySelector("#deleteListModal input[type='hidden']").value = id;

        document.querySelector('#deleteListModal').classList.add('is-active');

    },

    async handleDeleteListForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        // je récupère toutes les cartes associées à la liste et je les supprime
        const cards = await app.getListCardsFromAPI(formData.get('list_id'));
        cards.forEach(card => cardModule.deleteCard(card.id));

        // je supprime la liste 
        const response = await fetch(`http://localhost:3000/lists/delete/${formData.get('list_id')}`, {
            method: "DELETE",
            body: formData
        });

        if (response.ok) {
            document.querySelector(`[data-list-id="${formData.get('list_id')}"]`).parentElement.removeChild(document.querySelector(`[data-list-id="${formData.get('list_id')}"]`));
            app.closeModals();
        }
        else {
            console.log(response);
        }

    }

};