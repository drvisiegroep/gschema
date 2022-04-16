window.addEventListener("DOMContentLoaded", (event) => {
  //
  // Declerations
  //
  const listBtn = document.querySelector(".list-btn");
  const saveBtn = document.querySelector(".save-btn");
  const closePopupBtn = document.querySelector(".close-popup");
  const closeLijstBtn = document.querySelector(".close-lijst");
  const clearAllBtn = document.querySelector(".clearall-btn");
  const launchSavePopupBtn = document.querySelector(".launch-save-popup");
  const savePopup = document.querySelector(".popup");
  const popupMessage = document.querySelector(".message");
  const savePopupOverlay = document.querySelector(".popup-overlay");
  const schemaLijstContainer = document.querySelector(".schema-lijst-container");
  const schemaLijst = document.querySelector(".schema-lijst");
  let timeOut;


  //
  // Eventlisteners
  //
  listBtn.addEventListener("click", () => {
    schemaLijstContainer.classList.toggle('active');
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
    schemaLijstContainer.classList.remove('active');
  });
  
  closePopupBtn.addEventListener("click", () => {
    savePopup.classList.remove("active");
    savePopupOverlay.classList.remove("active");
    schemaLijstContainer.classList.remove('active');
  });

  closeLijstBtn.addEventListener("click", () => {
    schemaLijstContainer.classList.remove('active');
  })

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
  // - betere feedback voor gebruiker wanneer er een actie is gebeurd(saved, deleted, veld x niet goed ingevuld. etc.)

  //
  // Slidertest
  //


  const slider = document.querySelector(".items");
  const slides = document.querySelectorAll(".item");
  const button = document.querySelectorAll(".button");

  let current = 0;
  let prev = 4;
  let next = 1;

  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
  }

  const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

  const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

  const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
    }

    if (next == 5) {
      next = 0;
    }

    if (prev == -1) {
      prev = 4;
    }

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
  }



  
});
