function newSchedule(element) {
    element.addEventListener('click', event => {
        document.getElementById('header-inputs-1').removeAttribute('hidden');
        document.getElementById('button-create').setAttribute('style', "visibility: visible;");
        document.getElementById('name').focus();
        if(element.id === 'new-schedule') {
            if(element.isactive  === 'true') {  
                desactiveControlsHeader({id: 'header'});
                element.isactive = 'false';
                element.removeAttribute('style');
                return;
            }
            const buttonInitTemplate = document.getElementById('init-template');
            buttonInitTemplate.removeAttribute('style');
            buttonInitTemplate.isactive = 'false';
            document.getElementById('header-inputs-2').removeAttribute('hidden');
            allowInitialData = false;
        } else {
            if(element.isactive === 'true') {
                desactiveControlsHeader({id: 'header'});
                element.isactive = 'false';
                element.removeAttribute('style');
                return;
            }
            const buttonNewSchedule = document.getElementById('new-schedule');
            buttonNewSchedule.removeAttribute('style');
            buttonNewSchedule.isactive = 'false';
            document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
            allowInitialData = true;
        };
        element.setAttribute('style', "color: CadetBlue;");
        element.isactive = "true";
      })
};

function desactiveControlsHeader(target) {
    if (target.tagName === 'DIV' || target.id === 'header') {
      const buttonInitTemplate = document.getElementById('init-template');
      buttonInitTemplate.removeAttribute('style');
      buttonInitTemplate.isactive = 'false';
      const buttonNewSchedule = document.getElementById('new-schedule');
      buttonNewSchedule.removeAttribute('style');
      buttonNewSchedule.isactive = 'false';
      document.getElementById('header-inputs-1').setAttribute('hidden', 'hidden');
      document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
      document.getElementById('button-create').setAttribute('style', "visibility: hidden;");
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

function addSchedule(element) {
    element.addEventListener('click', event => {
        const userButtons = document.getElementById('hide-header-buttons');
        const buttonsContainer = document.getElementById('header-schedule-options-2');
        if(userButtons.hidden){
            if(!buttonsContainer.hidden) {
                buttonsContainer.setAttribute('hidden', 'hidden');
            }
            userButtons.removeAttribute('hidden');
        } else {
            userButtons.setAttribute('hidden', 'hidden');
            desactiveControlsHeader({id: 'header'})
        }
      });
}

function inputHeaderActiveDetector(element) {
    element.addEventListener("keyup", (event) => {
        if (event.keyCode === 27) desactiveControlsHeader({id: 'header'});
    });
}

function setSchedulesToOptions(dataSet) {
    const welcome = document.getElementById('welcome');
    const selectorBlock = document.getElementById('header-users');
    const selector = document.getElementById('schedule-selector');
    const optionsButton = document.getElementById('hide-header-subblock-3');
    optionsButton.removeAttribute('hidden');
    selector.innerHTML = '';
    dataSet[0].activeSchedule
    for(let i = 1; i < dataSet.length; i++) {
        const optionSelect = document.createElement('option');
        optionSelect.innerHTML = dataSet[i];
        optionSelect.value = dataSet[i];
        if(dataSet[0].activeSchedule === dataSet[i]) {
            optionSelect.selected = "true";
        }
        selector.append(optionSelect);
    }
    welcome.setAttribute('hidden', 'hidden');
    selectorBlock.removeAttribute('hidden');
    const userButtons = document.getElementById('hide-header-buttons');
    if(!userButtons.hidden) {
        userButtons.setAttribute('hidden', 'hidden');
    }
}

function create(element) {
    element.addEventListener('click', ()=> {
        const inputName = document.getElementById('name');
        const inputBlocksNumber = document.getElementById('blocks-number');
        const inputDescriptionsNumber = document.getElementById('descriptions-number');
        let storagedData = getData('schedules');
        const scheduleName = inputName.value.trim();
        if(!scheduleName) {
            alert('Debes introducir un nombre');
            return;
        };
        if(storagedData){
            let isValidName = true;
            storagedData.forEach(element => {
                if(typeof element !== 'object') {
                    if(element.toLowerCase() === scheduleName.toLowerCase()) {
                        alert('Ese nombre de agenda ya existe');
                        isValidName = false;
                        return;
                    };
                }
            });
            if(!isValidName) return
            storagedData.push(scheduleName);
            storagedData[0].activeSchedule = scheduleName;
            saveData('schedules', storagedData);
            const blocksContainer = document.getElementById('blocks-container');
            blocksContainer.innerHTML = '';
        } else {
            saveData('schedules', [{activeSchedule: scheduleName}, scheduleName]);
        }
        initialDescriptions[0].name = scheduleName;
        storagedData = getData('schedules');
        if(allowInitialData) blockConstructor(true, allowInitialData)
        else blockConstructor(true, false, [{name: scheduleName}], inputBlocksNumber.value, inputDescriptionsNumber.value);
        setSchedulesToOptions(storagedData);
        desactiveControlsHeader({id: 'header'});
      });
}

function renderBlocks(name) {
    if(!name) {
        name = getData('schedules')[0].activeSchedule;
    }
    const storagedData = getData('schedules');
    storagedData[0].activeSchedule = name;
    const schedule = getData(`${name}-titles`);
    const dataSet = [{}];
    if(schedule.length > 1) {
        let maxLength = 0;
        for(let i = 1; i !== schedule.length; i ++) {
            const blocksExample = getData(`${name}-${i}`);
            dataSet.push(blocksExample);
            blocksExample.length > maxLength ? maxLength = blocksExample.length : maxLength
        }
        dataSet[0] = {name, descriptionsInBlock: maxLength - 1};
    }
    const blocksContainer = document.getElementById('blocks-container');
    blocksContainer.innerHTML = '';
    blockConstructor(false, true, dataSet);
    saveData('schedules', storagedData);
}

function changeSchedule(element) {
    element.addEventListener('change', event => {
        const target = event.target;
        const name = target.value;
        renderBlocks(name);
    })
}

function scheduleOptions(element) {
    element.addEventListener('click', event => {
        const buttonsContainer = document.getElementById('header-schedule-options-2');
        const userButtons = document.getElementById('hide-header-buttons');
        if(buttonsContainer.hidden){
            if(!userButtons.hidden) {
                userButtons.setAttribute('hidden', 'hidden');
                desactiveControlsHeader({id: 'header'});
            }
            buttonsContainer.removeAttribute('hidden');
        } else {
            buttonsContainer.setAttribute('hidden', 'hidden');
        }
    });
}

function deleteAll(element) {
    element.addEventListener('click', event => {
        const deleteAllSchedules = confirm("Borrar todas las agendas \nes una acción que no se puede deshacer");
        if(deleteAllSchedules) {
            const schedules = getData('schedules');
            for(let i = 1; i !== schedules.length; i++) {
                const name = schedules[i];
                const titles = getData(`${name}-titles`);
                if(titles) {
                    for(let j = 1; j !== titles.length; j++) {
                        deleteData(`${name}-${j}`);
                    }
                }
                deleteData(`${name}-titles`);
            };
            deleteData('schedules');
            const userButtons = document.getElementById('hide-header-buttons');
            userButtons.removeAttribute('hidden');
            const welcome = document.getElementById('welcome');
            welcome.removeAttribute('hidden');
            const selectorBlock = document.getElementById('header-users');
            const selector = document.getElementById('schedule-selector');
            selector.innerHTML = '';
            selectorBlock.setAttribute('hidden', 'hidden');
            const buttonsContainer = document.getElementById('header-schedule-options-2');
            buttonsContainer.setAttribute('hidden', 'hidden');
            const optionsButton = document.getElementById('hide-header-subblock-3');
            optionsButton.setAttribute('hidden', 'hidden');
            const blocksContainer = document.getElementById('blocks-container');
            blocksContainer.innerHTML = '';
        } else return;
    });
}

function check(element) {
    const [identifier, isTitle, description, input, type] = elementToModify(element);
    let textToInsert;
    element.innerText !== '' ? textToInsert = '' : textToInsert = '✓';
    element.innerText = textToInsert;
    blockEdit(identifier, isTitle, textToInsert, type);
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

function blockEventDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      if (target.className === 'block' || target.tagName === 'OL' || target.className === 'list') {
        desactiveControls();
      };
      if(target.tagName = 'LI') {
          const type = target.getAttribute('id').split('-')[0];
            switch (type) {
                case 'check':
                    check(target);
                    break;
                case 'insert':
                    insert(target);
                    break;
                case 'delete':
                    deleteDescription(target);
                    break;
                default:
                    break;
            }
      }
    })
}
  
function saveData(key, dataSet) {
    localStorage.setItem(key, JSON.stringify(dataSet));
};

function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}

function deleteData(key) {
    localStorage.removeItem(key);
};

function blockEdit(identifier, isTitle, textToInsert, type) {
    const name = getData('schedules')[0].activeSchedule;
    const titles = getData(`${name}-titles`);
    let blockArray = [];
    let indexArray = 0;
    if(isTitle === 't'){
        blockArray = getData(`${name}-${identifier}`);
        blockArray[indexArray] = textToInsert;
        titles[identifier] = textToInsert;
        saveData(`${name}-titles`, titles);
        saveData(`${name}-${identifier}`, blockArray);
    } else {
        const titlesLength = titles.length;
        if(titlesLength > 1) {
            const firstBlock = getData(`${name}-${1}`);
            const blocksLength = firstBlock.length - 1;
            const blockNumber = Math.ceil(identifier/blocksLength);
            blockArray = getData(`${name}-${blockNumber}`);
            indexArray = identifier - (blockNumber - 1)*blocksLength;
            type === 'check' ? blockArray[indexArray][0] = textToInsert : blockArray[indexArray][1] = textToInsert;
            saveData(`${name}-${blockNumber}`, blockArray);
        }
    };
}

function elementToModify(element) {
    const [type, identifier, isTitle] = element.getAttribute('id').split('-');
    let inputId = `input-${identifier}`;
    let descriptionId = `description-${identifier}`

    if(isTitle) {
        inputId += `-${isTitle}`;
        descriptionId += `-${isTitle}`;
    }
    let description;
    let input;
    if(type === 'insert' || type === 'delete' || type === 'input') {
        description = document.getElementById(descriptionId);
        input = document.getElementById(inputId);
    }
    return [identifier, isTitle, description, input, type]
}

function insert(element) {
    const [identifier, isTitle, description, input] = elementToModify(element);
    //
    const textToInsert = input.value.trim();
    description.innerHTML = textToInsert;
    //
    blockEdit(identifier, isTitle, textToInsert);
    desactiveControls();
}

function deleteDescription(element) {
    const [identifier, isTitle, description, input] = elementToModify(element);
    // input.value = ''; // la acción de este comando antes de "desactiveControls()" queda desactivada por dicha función, pero al colocarlo después si funciona
    let textToInsert;
    isTitle ? textToInsert = `Título ${identifier}` : textToInsert = '';
    description.innerHTML = textToInsert
    blockEdit(identifier, isTitle, textToInsert);
    desactiveControls();
    input.value = ''; // aquí se se limpia el campo de entrada luego de activar el botón de borrar
}
  
function blockConstructor(isNew, allowInitialData, dataToInsert = initialDescriptions, blocksNumber, descriptionsNumber) {
    let n;
    let m;
    const name = dataToInsert[0].name
    allowInitialData ? n = dataToInsert.length - 1 : n = blocksNumber;
    allowInitialData ? m = dataToInsert[0].descriptionsInBlock : m = descriptionsNumber;
    const blocksContainer = document.getElementById('blocks-container');
    const scheduleBlocks = [];
    if(isNew) {
        scheduleBlocks.push(name);
    }
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
                    let headingText = '';
                    allowInitialData ? headingText = dataToInsert[i + 1][0] : headingText = `Título ${i+1}`
                    heading.innerHTML = headingText;
                    isNew && scheduleBlocks.push(headingText);
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
                        });
                    title.appendChild(buttonInsert);
                        const buttonDelete = document.createElement("button");
                        buttonDelete.setAttribute("id", `delete-${i + 1}-t`);
                        buttonDelete.setAttribute("class", 'button-delete');
                        buttonDelete.setAttribute("hidden", 'hidden');
                        buttonDelete.innerHTML = 'borrar';
                        buttonDelete.addEventListener('click', () => {     
                        });
                    title.appendChild(buttonDelete);
            block.appendChild(title);
            descriptionInputControls(title);
                const list = document.createElement("DIV");  
                    list.setAttribute("id", `list-${i+1}`);
                    list.setAttribute("class", 'list');
                        const ol = document.createElement("ol");  
                        ol.setAttribute("id", `ol-${i+1}`);
                        const blockDescriptions = [];
                        if(isNew) {
                            blockDescriptions.push(headingText);
                        }
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
                        let descriptionText = '';
                        let checkText = '';
                        if(allowInitialData && (dataToInsert[i + 1].length > j + 1)) {
                            descriptionText = dataToInsert[i + 1][j + 1][1];
                            description.innerHTML = descriptionText;
                            checkText = dataToInsert[i + 1][j + 1][0];
                            check.innerHTML = checkText;
                        }
                        isNew && blockDescriptions.push([checkText, descriptionText]);
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
                            });
                        li.appendChild(buttonInsert);
                            const buttonDelete = document.createElement("button");
                            buttonDelete.setAttribute("id", `delete-${j+1 +i*m}`);
                            buttonDelete.setAttribute("class", 'button-delete');
                            buttonDelete.setAttribute("hidden", 'hidden');
                            buttonDelete.innerHTML = 'borrar';
                            buttonDelete.addEventListener('click', () => {           
                            });
                        li.appendChild(buttonDelete);
                        descriptionInputControls(li);
                        ol.appendChild(li);
                        };
                        isNew && saveData(`${name}-${i + 1}`, blockDescriptions)
                    list.appendChild(ol);
            block.appendChild(list);
            blockEventDetector(block);
            blocksContainer.appendChild(block);
    };
    isNew && saveData(`${name}-titles`, scheduleBlocks);
};