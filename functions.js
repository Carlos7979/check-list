function newSchedule(element) {
    element.addEventListener('click', event => {
        document.getElementById('header-inputs-1').removeAttribute('hidden');
        document.getElementById('name').focus();
        if(element.id === 'new-schedule') {
            const buttonInitTemplate = document.getElementById('init-template');
            buttonInitTemplate.removeAttribute('disabled');
            buttonInitTemplate.removeAttribute('style');
            document.getElementById('header-inputs-2').removeAttribute('hidden');
        } else {
            const buttonNewSchedule = document.getElementById('new-schedule');
            buttonNewSchedule.removeAttribute('disabled');
            buttonNewSchedule.removeAttribute('style');
            document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
        };
        element.setAttribute('style', "color: CadetBlue;");
        element.disabled = 'true';
      })
};

function desactiveControlsHeader(target) {
    if (target.tagName === 'DIV' || target.id === 'header') {
      const buttonInitTemplate = document.getElementById('init-template');
      buttonInitTemplate.removeAttribute('disabled');
      buttonInitTemplate.removeAttribute('style');
      const buttonNewSchedule = document.getElementById('new-schedule');
      buttonNewSchedule.removeAttribute('disabled');
      buttonNewSchedule.removeAttribute('style');
      document.getElementById('header-inputs-1').setAttribute('hidden', 'hidden');
      document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
      document.getElementById('name').value = '';
      document.getElementById('blocks-number').value = '4';
      document.getElementById('descriptions-number').value = '10';
    }
}

function editHeaderControlActiveDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      desactiveControlsHeader(target);
    });
}

function inputHeaderActiveDetector(element) {
    element.addEventListener("keyup", (event) => {
        if (event.keyCode === 27) desactiveControlsHeader({id: 'header'});
    });
}

function check(element) {
    element.addEventListener('click',  (event) => {
      const target = event.target;
      if (target.classList.contains('check')) {
        const listID = target.getAttribute('id');
        const checkButton = document.getElementById(listID);
        checkButton.innerText !== '' ? checkButton.innerText = '' : checkButton.innerText = '✓';
      }
    });
};

function desactiveControls(element) {
    if(editControlsActive.length) {
        if(element && (element.id === editControlsActive[3].id)) return;
        editControlsActive[0].removeAttribute('hidden');
        editControlsActive[1].setAttribute('hidden', 'hidden');
        editControlsActive[2].setAttribute('hidden', 'hidden');
        editControlsActive[3].setAttribute('type', 'hidden');
        editControlsActive = [];
    }
};

function descriptionInputControls(element) {
    element.addEventListener('click',  (event) => {
      const target = event.target;
      if (target.tagName === 'LI' || target.classList.contains('description') || target.className === 'title') {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        let description = document.getElementById(`description-${identifier}`);
        let input = document.getElementById(`input-${identifier}`);
        let buttonInsert = document.getElementById(`insert-${identifier}`);
        let buttonDelete = document.getElementById(`delete-${identifier}`);
        if(target.classList.contains('title')) {
          description = document.getElementById(`description-${identifier}-t`);
          input = document.getElementById(`input-${identifier}-t`);
          buttonInsert = document.getElementById(`insert-${identifier}-t`);
          buttonDelete = document.getElementById(`delete-${identifier}-t`);
        };
        desactiveControls(input);
        let typeInput;
        input.getAttribute('type') === 'hidden' ? typeInput = 'text' : typeInput = 'hidden';
        input.setAttribute('type', typeInput);
        if(description.innerText.trim()) {
          buttonInsert.innerText = "editar";
          input.value = description.innerText.trim();
        };
        if(typeInput === 'text') {
          description.setAttribute('hidden', 'hidden');
          buttonInsert.removeAttribute('hidden');
          buttonDelete.removeAttribute('hidden');
          editControlsActive = [description, buttonInsert, buttonDelete, input];
          input.focus();
        } else {
          buttonInsert.setAttribute('hidden', 'hidden');
          buttonDelete.setAttribute('hidden', 'hidden');
          description.removeAttribute('hidden');
        };
      }
    });
};

function editControlActiveDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      if (target.className === 'block' || target.tagName === 'OL') {
        desactiveControls();
      }
    })
}
  
function saveData(key, dataSet) {
    localStorage.setItem(key, JSON.stringify(dataSet));
};

function getData(key) {
    JSON.parse(localStorage.getItem(key))
}

function deleteData(key) {
    localStorage.removeItem(key);
};

function storageKeys(key) {
    // const users = getData(key);
    // users.list[]
    //TODO
}

function insert(element) {
    const id = element.getAttribute('id');
    const identifier = id.split('-')[1];
    const isTitle = id.split('-')[2];
    let inputId = `input-${identifier}`;
    let description = document.getElementById(`description-${identifier}`);
    if(isTitle) {
        inputId += `-${isTitle}`;
        description = document.getElementById(`description-${identifier}-t`);
    }
    input = document.getElementById(inputId);
    description.innerHTML = input.value;
    desactiveControls();
}

function deleteDescription(element) {
    const id = element.getAttribute('id');
    const identifier = id.split('-')[1];
    const isTitle = id.split('-')[2];
    let inputId = `input-${identifier}`;
    let description = document.getElementById(`description-${identifier}`);
    if(isTitle) {
        inputId += `-${isTitle}`;
        description = document.getElementById(`description-${identifier}-t`);
    }
    input = document.getElementById(inputId);
    // input.value = ''; // la acción de este comando antes de "desactiveControls()" queda desactivada por dicha función, pero al colocarlo después si funciona
    isTitle ? description.innerHTML = `Título ${identifier}` : description.innerHTML = '';
    desactiveControls();
    input.value = ''; // aquí se se limpia el campo de entrada luego de activar el botón de borrar
}
  
function blockConstructor(blocksNumber = 4, allowInitialData, dataToInsert = initialDescriptions, descriptionsNumber = 9) {
    let n;
    let m;
    allowInitialData ? n = dataToInsert.length - 1 : n = blocksNumber;
    allowInitialData ? m = dataToInsert[0].descriptionsInBlock : m = descriptionsNumber;
    const blocksContainer = document.getElementById('blocks-container');
    for(let i = 0; i < n; i++) {
        const block = document.createElement("DIV");
            block.setAttribute("id", `block-${i+1}`);
            block.setAttribute("class", 'block');

                const title = document.createElement("DIV");  
                    title.setAttribute("id", `title-${i+1}`);
                    title.setAttribute("class", 'title');
                        const heading = document.createElement("h3");  
                        heading.setAttribute("id", `description-${i+1}-t`);
                        heading.setAttribute("class", 'title');
                    title.appendChild(heading);
                    allowInitialData ? heading.innerHTML = dataToInsert[i + 1][0] : heading.innerHTML = `Título ${i+1}`
                        const input = document.createElement("input");
                        input.setAttribute("id", `input-${i + 1}-t`);
                        input.setAttribute("class", 'title-i');
                        input.setAttribute("maxlength", '60');
                        input.setAttribute("type", 'hidden');
                        input.addEventListener("keyup", (event) => {
                            if (event.keyCode === 13) insert(input);
                            if (event.keyCode === 27) desactiveControls();
                        });
                    title.appendChild(input);
                        const buttonInsert = document.createElement("button");
                        buttonInsert.setAttribute("id", `insert-${i + 1}-t`);
                        buttonInsert.setAttribute("class", 'button-edit');
                        buttonInsert.setAttribute("hidden", 'hidden');
                        buttonInsert.innerHTML = 'insertar';
                        buttonInsert.addEventListener('click', () => {
                            insert(buttonInsert);
                        });
                    title.appendChild(buttonInsert);
                        const buttonDelete = document.createElement("button");
                        buttonDelete.setAttribute("id", `delete-${i + 1}-t`);
                        buttonDelete.setAttribute("class", 'button-delete');
                        buttonDelete.setAttribute("hidden", 'hidden');
                        buttonDelete.innerHTML = 'borrar';
                        buttonDelete.addEventListener('click', () => {
                            deleteDescription(buttonDelete);
                        });
                    title.appendChild(buttonDelete);
            block.appendChild(title);
            descriptionInputControls(title);
                const list = document.createElement("DIV");  
                    list.setAttribute("id", `list-${i+1}`);
                    list.setAttribute("class", 'list');
                        const ol = document.createElement("ol");  
                        ol.setAttribute("id", `ol-${i+1}`);
                        for(let j = 0; j < m; j++) {
                        const li = document.createElement("li");
                        li.setAttribute("id", `li-${j+1 +i*m}`);
                            const check = document.createElement("DIV");
                            check.setAttribute("id", `check-${j+1 +i*m}`);
                            check.setAttribute("class", 'check');
                        li.appendChild(check);
                            const description = document.createElement("DIV");
                            description.setAttribute("id", `description-${j+1 +i*m}`);
                            description.setAttribute("class", 'description');
                        li.appendChild(description);
                        if(allowInitialData && (dataToInsert[i + 1].length > j + 1)) {
                            description.innerHTML = dataToInsert[i + 1][j + 1];
                        }
                            const input = document.createElement("input");
                            input.setAttribute("id", `input-${j+1 +i*m}`);
                            input.setAttribute("maxlength", '60');
                            input.setAttribute("type", 'hidden');
                            input.addEventListener("keyup", (event) => {
                                if (event.keyCode === 13) insert(input);
                                if (event.keyCode === 27) desactiveControls();
                            });
                        li.appendChild(input);
                            const buttonInsert = document.createElement("button");
                            buttonInsert.setAttribute("id", `insert-${j+1 +i*m}`);
                            buttonInsert.setAttribute("class", 'button-edit');
                            buttonInsert.setAttribute("hidden", 'hidden');
                            buttonInsert.innerHTML = 'insertar';
                            buttonInsert.addEventListener('click', () => {
                                insert(buttonInsert);
                            });
                        li.appendChild(buttonInsert);
                            const buttonDelete = document.createElement("button");
                            buttonDelete.setAttribute("id", `delete-${j+1 +i*m}`);
                            buttonDelete.setAttribute("class", 'button-delete');
                            buttonDelete.setAttribute("hidden", 'hidden');
                            buttonDelete.innerHTML = 'borrar';
                            buttonDelete.addEventListener('click', () => {
                                deleteDescription(buttonDelete);
                            });
                        li.appendChild(buttonDelete);
                        descriptionInputControls(li);
                        ol.appendChild(li);
                        }
                    list.appendChild(ol);
                    check(list);
            block.appendChild(list);
            editControlActiveDetector(block);
            blocksContainer.appendChild(block);
            // if(allowInitialData) saveData(dataToInsert);
            // deleteData('key');
    }
};