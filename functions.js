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
};

function setSchedulesToOptions(schedules) {
    const welcome = document.getElementById('welcome');
    const selectorBlock = document.getElementById('header-users');
    const selector = document.getElementById('schedule-selector');
    const optionsButton = document.getElementById('hide-header-subblock-3');
    optionsButton.removeAttribute('hidden');
    selector.innerHTML = '';
    schedules[0].activeSchedule
    for(let i = 1; i < schedules.length; i++) {
        const optionSelect = document.createElement('option');
        optionSelect.innerHTML = schedules[i];
        optionSelect.value = schedules[i];
        if(schedules[0].activeSchedule === schedules[i]) {
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
};

function renderBlocks(name) {
    const blocksContainer = document.getElementById('blocks-container');
    blocksContainer.innerHTML = '';
    if(name) {
        const storagedData = getData('schedules');
        storagedData[0].activeSchedule = name;
        saveData('schedules', storagedData);
    }
    if(!name) {
        name = getData('schedules')[0].activeSchedule;
    }
    const titles = getData(`${name}-titles`);
    const dataSet = [{}];
    if(titles.length > 1) {
        let maxLength = 0;
        for(let i = 1; i !== titles.length; i ++) {
            const blocksExample = getData(`${name}-${i}`);
            dataSet.push(blocksExample);
            blocksExample.length > maxLength ? maxLength = blocksExample.length : maxLength
        }
        dataSet[0] = {name, descriptionsInBlock: maxLength - 1};
    }
    blockConstructor(false, true, dataSet);
    // console.log(blocksContainer.children.length);
};

function check(element) {
    const [identifier, isTitle, description, input, type] = elementToModify(element);
    let textToInsert;
    let classToInsert;
    element.innerText !== '' ? textToInsert = '' : textToInsert = '✓';
    element.innerText !== '' ? classToInsert = 'description' : classToInsert = 'description-checked';
    element.innerText = textToInsert;
    blockEdit(identifier, isTitle, textToInsert, type);
    description.setAttribute('class', classToInsert);
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

function deleteDescription(element) {
    const [identifier, isTitle, description, input] = elementToModify(element);
    // input.value = ''; // la acción de este comando antes de "desactiveControls()" queda desactivada por dicha función, pero al colocarlo después si funciona
    let textToInsert;
    isTitle ? textToInsert = `Título ${identifier}` : textToInsert = '';
    description.innerHTML = textToInsert
    blockEdit(identifier, isTitle, textToInsert);
    desactiveControls();
    input.value = ''; // aquí se se limpia el campo de entrada luego de activar el botón de borrar
};

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
};

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
    if(type === 'insert' || type === 'delete' || type === 'input' || type === 'check') {
        description = document.getElementById(descriptionId);
        input = document.getElementById(inputId);
    }
    return [identifier, isTitle, description, input, type]
};

function insert(element) {
    const [identifier, isTitle, description, input] = elementToModify(element);
    //
    const textToInsert = input.value.trim();
    description.innerHTML = textToInsert;
    //
    blockEdit(identifier, isTitle, textToInsert);
    desactiveControls();
};

function maxLengthBlock() {
    const name = getData('schedules')[0].activeSchedule;
    const titles = getData(`${name}-titles`);
    const titlesLength = titles.length;
    let maxLength = 0;
    if(titlesLength > 1) {
        for(let i = 1; i !== titlesLength; i ++) {
            const blocksExample = getData(`${name}-${i}`);
            blocksExample.length > maxLength ? maxLength = blocksExample.length : maxLength
        };
    };
    return [name, titles, titlesLength , maxLength];
};

function deleteAllSchedules() {
    // const schedules = getData('schedules');
    // for(let i = 1; i !== schedules.length; i++) {
    //     const name = schedules[i];
    //     const titles = getData(`${name}-titles`);
    //     if(titles) {
    //         for(let j = 1; j !== titles.length; j++) {
    //             deleteData(`${name}-${j}`);
    //         }
    //     }
    //     deleteData(`${name}-titles`);
    // };
    // deleteData('schedules');
    localStorage.clear();
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
}