function disableControlsHeader(target) {
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
        const schedules = getData('schedules');
        schedules[0].activeSchedule = name;
        saveData('schedules', schedules);
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
};

function blockId(identifier, isTitle, type) {
    const name = getData('schedules')[0].activeSchedule;
    let blockArray = [];
    let indexArray = 0;
    let blockNumber = 0;
    if(isTitle === 't' || type === 'checkall') {
        blockArray = getData(`${name}-${identifier}`);
        blockNumber = identifier;
    } else {
        const firstBlock = getData(`${name}-${1}`);
        const blocksLength = firstBlock.length - 1;
        blockNumber = Math.ceil(identifier/blocksLength);
        blockArray = getData(`${name}-${blockNumber}`);
        indexArray = identifier - (blockNumber - 1)*blocksLength;
    };
    return [blockArray, blockNumber, indexArray, name];
};

function check(element) {
    const [identifier, isTitle, description, input, type] = elementToModify(element);
    if(!description.innerText) return;
    let textToInsert;
    let classToInsert;
    element.innerText !== '' ? textToInsert = '' : textToInsert = '✓';
    element.innerText !== '' ? classToInsert = 'description' : classToInsert = 'description-checked';
    element.innerText = textToInsert;
    blockSave(identifier, isTitle, textToInsert, type);
    description.setAttribute('class', classToInsert);
    isCheckAll(identifier, isTitle);
    counterDescriptionsChecks(element);
};

function isCheckAll(identifier, isTitle) {
    const [blockArray, blockNumber] = blockId(identifier, isTitle);
    let counterChecks = 0;
    let counterDescriptions = 0;
    blockArray.forEach( e => {
        if(Array.isArray(e) && e[0]) counterChecks++;
        if(Array.isArray(e) && e[1]) counterDescriptions++;
    });
    const checkAll = document.getElementById(`checkall-${blockNumber}`);
    counterChecks === counterDescriptions ? checkAll.innerHTML = '✓' : checkAll.innerHTML = '';
    if(!counterDescriptions) checkAll.innerHTML = '';
}

function checkAll(element) {
    const [identifier, isTitle, description, input, type] = elementToModify(element);
    const name = getData('schedules')[0].activeSchedule;
    let counter = 0;
    let indexToFill = [];
    element.innerText ? textToInsert = '' : textToInsert = '✓';
    const li = document.getElementById(`ol-${identifier}`).children;
    const liLength = li.length;
    for(let i = 0; i < liLength; i++) {
        const description = li[i].children[2];
        const checkElement = li[i].children[0];
        const descriptionToStyle = document.getElementById(`description-${checkElement.id.split('-')[1]}`)
        if(description.innerHTML) counter++;
        if(description.innerHTML && !checkElement.innerHTML) {
            const [blockArray, blockNumber, indexArray] = blockId(checkElement.id.split('-')[1]);
            indexToFill.push(indexArray);
            descriptionToStyle.setAttribute('class', 'description-checked');
            checkElement.innerHTML = '✓';
        } else if(description.innerHTML && element.innerText) {
            if(checkElement.innerHTML) {
                descriptionToStyle.setAttribute('class', 'description');
                checkElement.innerHTML = '';

            }
        };
    };
    if(!counter) return;
    element.innerText = textToInsert;
    blockSave(identifier, isTitle, false, type, indexToFill);
    counterDescriptionsChecks(element, type);
};

function disableControls(element) {
    if(editControlsActive.length) {
        if(element && (element.id === editControlsActive[3].id)) return;
        editControlsActive[0].removeAttribute('hidden');
        editControlsActive[1].setAttribute('hidden', 'hidden');
        editControlsActive[2].setAttribute('hidden', 'hidden');
        editControlsActive[3].setAttribute('type', 'hidden');
        editControlsActive = [];
    };
};

function deleteDescription(element) {
    const [identifier, isTitle, description, input] = elementToModify(element);
    // input.value = ''; // la acción de este comando antes de "disableControls()" queda desactivada por dicha función, pero al colocarlo después si funciona
    let textToInsert = '';
    let insertId = `insert-${identifier}`;
    if(isTitle) {
        insertId += `-${isTitle}`;
        textToInsert = `Título ${identifier}`
    };
    const checkElement = document.getElementById(`check-${identifier}`);
    if(checkElement.innerHTML) check(checkElement);
    description.innerHTML = textToInsert
    blockSave(identifier, isTitle, textToInsert);
    disableControls();
    input.value = ''; // aquí se se limpia el campo de entrada luego de activar el botón de borrar
    const buttonInsert = document.getElementById(insertId);
    buttonInsert.innerText = "insert";
    isCheckAll(identifier, isTitle);
    counterDescriptionsChecks(element);
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

function blockSave(identifier, isTitle, textToInsert, type, indexToFill) {
    const [blockArray, blockNumber, indexArray, name] = blockId(identifier, isTitle, type);
    const titles = getData(`${name}-titles`);
    if(isTitle === 't'){
        blockArray[indexArray] = textToInsert;
        titles[identifier] = textToInsert;
        saveData(`${name}-titles`, titles);
        saveData(`${name}-${identifier}`, blockArray);
    } else if(type === 'checkall') {
        if(indexToFill.length) {
            indexToFill.forEach(e => {
                blockArray[e][0] = '✓';
            });
            saveData(`${name}-${blockNumber}`, blockArray);
        } else {
            for(let i = 1; i < blockArray.length; i++) {
                blockArray[i][0] = '';
            };
            saveData(`${name}-${blockNumber}`, blockArray);
        };
        // for(const index in li) {
        //     const description = li[index].children[2];
        //     if(description.innerHTML) console.log(description.innerHTML);
        // }
    } else {
        const titlesLength = titles.length;
        if(titlesLength > 1) {
            type === 'check' ? blockArray[indexArray][0] = textToInsert : blockArray[indexArray][1] = textToInsert;
            saveData(`${name}-${blockNumber}`, blockArray);
        };
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
    blockSave(identifier, isTitle, textToInsert);
    disableControls();
    isCheckAll(identifier, isTitle);
    counterDescriptionsChecks(element);
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
};

function counterDescriptionsChecks(ol, type, span1, span3, percentage) {
    let li;
    const [identifier] = elementToModify(ol);
    const [blockArray, blockNumber] = blockId(identifier, false, type);
    if(ol && span1 && span3) {
        li = ol.children
    } else {
        li = document.getElementById(`ol-${blockNumber}`).children;
        span1 = document.getElementById(`span1-${blockNumber}`);
        span3 = document.getElementById(`span3-${blockNumber}`);
        percentage = document.getElementById(`percentage-${blockNumber}`);
    }
    let counterDescriptions = 0;
    let counterChecks = 0;
    const liLength = li.length;
    for(let i = 0; i < liLength; i++) {
        const description = li[i].children[2];
        const checkElement = li[i].children[0];
        if(description.innerHTML) counterDescriptions++;
        if(checkElement.innerHTML) counterChecks++;
    };
    span1.innerHTML = counterChecks;
    span3.innerHTML = counterDescriptions;
    if(!counterDescriptions) {
        percentage.innerText = `${counterDescriptions}%`
    } else {
        let percentageResult = counterChecks*100/counterDescriptions;
        if(counterChecks*100 % counterDescriptions) percentageResult = Math.round(percentageResult*100)/100;
        percentage.innerText = `${percentageResult}%`
    }
}