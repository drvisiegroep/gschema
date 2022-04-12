window.addEventListener('DOMContentLoaded', (event) => {
    const listBtn = document.querySelector('.list-btn');
    const saveBtn = document.querySelector('.save-btn');
    const schemaList = document.querySelector('.schema-list');

    listBtn.addEventListener('click', () => {
        console.log(listSavedEntries())
    });

    saveBtn.addEventListener('click', () => {
        saveEntries(saveName())
    });

    function serializeEntries() {
        let textareas = document.querySelectorAll('textarea');
        let entries = [];
        textareas.forEach(textarea => {
            entries.push(textarea.value);
        });
        return entries;
    }

    function saveName() {
        const saveName = document.querySelector('#schema-naam').value
        return saveName;
    }

    function listSavedEntries() {
        const items = {...localStorage}
        return items;
    }

    
    function saveEntries(name) {
        localStorage.setItem(name,serializeEntries());
    }

});