window.addEventListener("DOMContentLoaded", (event) => {
  //
  // Declerations
  //
  const listBtn = document.querySelector(".list-btn");
  const saveBtn = document.querySelector(".save-btn");
  const clearAllBtn = document.querySelector(".clearall-btn");
  const launchSavePopupBtn = document.querySelector(".launch-save-popup");
  const savePopup = document.querySelector(".popup");
  const savePopupOverlay = document.querySelector(".popup-overlay");
  const schemaLijst = document.querySelector(".schema-lijst");
  let timeOut;


  //
  // Eventlisteners
  //
  listBtn.addEventListener("click", () => {
    schemaLijst.classList.toggle('active');
    listSavedEntries();
  });

  launchSavePopupBtn.addEventListener("click", () => {
    if (schemaValidation() == false) {
      return false;
    }
    savePopup.classList.add("active");
    savePopupOverlay.classList.add("active");
  });

  savePopupOverlay.addEventListener("click", () => {
    savePopup.classList.remove("active");
    savePopupOverlay.classList.remove("active");
    schemaLijst.classList.remove('active');
  });

  clearAllBtn.addEventListener("mouseup", () => {
    clearTimeout(timeOut);
    return;
  });

  clearAllBtn.addEventListener("mousedown", () => {
    timeOut = window.setTimeout(() => {
      clearAll();
      listSavedEntries();
      //Timeout moet gelijk zijn aan de transition voor de button in de css
    }, 2000);
    return;
  });

  saveBtn.addEventListener("click", () => {
    if (schemaValidation() == false) {
      return false;
    }
    saveItem(saveName());
    listSavedEntries();
  });

  schemaLijst.addEventListener("click", function (e) {
    if (e.target && e.target.className == "remove-btn btn") {
      const itemDataName = e.target.parentNode.dataset.name;
      removeItem(itemDataName);
      listSavedEntries();
    }
  });


  //
  // Functions
  //
  function clearAll() {
    localStorage.clear();
  }

  function deleteConfirmation() {}

  function serializeEntries() {
    let textareas = document.querySelectorAll(".schema-input");
    let entries = {};
    textareas.forEach((textarea) => {
      entries[textarea.dataset.kenmerk] = strip(textarea.value);
    });

    return JSON.stringify(entries);
  }

  function saveName() {
    const saveName = document.querySelector("#schema-naam").value;
    return saveName;
  }

  function removeItem(name) {
    localStorage.removeItem(name);
  }

  function strip(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  function listSavedEntries() {
    const items = { ...localStorage };
    const schemaLijst = document.querySelector(".schema-lijst");
    list = "";

    for (const [itemName, value] of Object.entries(items)) {
      list += `<div class="schema-item" data-name="${itemName}"><h2>${itemName}</h2>`;

      for (const [kenmerk, entry] of Object.entries(JSON.parse(value))) {
        list += `<p><strong>${kenmerk}</strong>: ${entry}</p>`;
      }

      list += `<div class="remove-btn btn">Verwijder item</div></div>`;
    }

    schemaLijst.innerHTML = list;
  }

  function saveItem(name) {
    localStorage.setItem(name, serializeEntries());
  }

  function schemaValidation() {
    const textareas = document.querySelectorAll(".schema-input");
    const validInputs = Array.from(textareas).filter(
      (input) => input.value !== ""
    );

    textareas.forEach((textarea) => {
      if (textarea.value == "") {
        textarea.classList.add("error");
      } else {
        textarea.classList.remove("error");
      }
    });

    if (validInputs.length == textareas.length) {
      return true;
    } else {
      return false;
    }
  }

  // TODO:
  // - HTML / CSS aanpassen voor card slider (desktop / mobiel)
  // - Bericht weergeven als er geen opgeslagen items zijn.
  // - berichtenlijst een close button geven
  // - betere popup verzinnen voor de opgeslagen lijst?
  // - 
});
