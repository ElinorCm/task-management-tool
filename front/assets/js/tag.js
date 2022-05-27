const tagModule = {

    showAddTagModal: function () {
        const modal = document.querySelector('#addTagModal');
        modal.classList.add('is-active');
    },

    async handleAddTagForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        const response = await fetch(`http://localhost:3000/tags/create`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const tag = await response.json();
            tagModule.makeTagInDOM(tag);
            app.closeModals();
        }
        else {
            console.log(response);
        }

    },

    makeTagInDOM: function ({ name, id }) {
        let templateTag = document.querySelector('#tag-template');
        const templateTagHTML = document.importNode(templateTag.content, true);

        templateTagHTML.querySelector('.tag-name').textContent = name;

        templateTagHTML.querySelector('[data-tag-id="{tag.id}"]').setAttribute("data-tag-id", id);

        templateTagHTML.querySelector('[name="tag_id"]').value = id;

        templateTagHTML.querySelector('.tag-name').addEventListener('dblclick', function () { tagModule.showUpdateTagForm(id) });
        templateTagHTML.querySelector('.update-tag-button').addEventListener('click', function () { tagModule.showUpdateTagForm(id) });
        templateTagHTML.querySelector('.update-tag-form').addEventListener('submit', tagModule.handleUpdateTagForm);
        templateTagHTML.querySelector(".remove-tag-button").addEventListener("click", function () { tagModule.showDeleteTagModal(id) });

        document.querySelector('#tag-container').append(templateTagHTML);
    },

    showDeleteTagModal: function (id) {

        // Event listener
        document.querySelector('#deleteTagModal .delete-tag-form').addEventListener('submit', tagModule.handleDeleteTagForm);

        // je mets à jour mon champs input
        document.querySelector("#deleteTagModal input[type='hidden']").value = id;

        document.querySelector('#deleteTagModal').classList.add('is-active');

    },

    async handleDeleteTagForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        // je récupère touts les clones présents et je les supprime

        // je supprime le tag
        const response = await fetch(`http://localhost:3000/tags/delete/${formData.get('tag_id')}`, {
            method: "DELETE",
            body: formData
        });

        if (response.ok) {
            document.querySelector(`[data-tag-id="${formData.get('tag_id')}"]`).parentElement.removeChild(document.querySelector(`[data-tag-id="${formData.get('tag_id')}"]`));
            app.closeModals();
        }
        else {
            console.log(response);
        }

    },

    showUpdateTagForm: function (id) {
        document.querySelector(`[data-tag-id="${id}"] .tag-name`).classList.toggle('is-hidden');
        document.querySelector(`[data-tag-id="${id}"] form`).classList.toggle('is-hidden');
    },

    async handleUpdateTagForm(event) {

        event.preventDefault();

        const formData = new FormData(event.target);

        if (formData.get("name") != document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] .tag-name`).textContent) {
            const response = await fetch(`http://localhost:3000/lists/update/${formData.get('tag_id')}`, {
                method: "PATCH",
                body: formData
            });

            if (response.ok) {
                const tag = await response.json();
                document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] .tag-name`).textContent = tag.name;
                document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] .tag-name`).classList.remove('is-hidden');
                document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] form`).classList.add('is-hidden');
            }
            else {
                console.log(response);
            }
        } else {
            document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] .tag-name`).classList.remove('is-hidden');
            document.querySelector(`[data-tag-id="${formData.get('tag_id')}"] form`).classList.add('is-hidden');
        };

    },
}; 