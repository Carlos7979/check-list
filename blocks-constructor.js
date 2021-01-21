// DIV → id, class, innerHTML, title
// IMG → id, class, src, alt, title
// SPAN → id, class, innerHTML
// H3 → id, class, innerHTML
// INPUT → id, class, type, maxlength, eventListener
// BUTTON → id, class, hidden, eventListener, innerHTML
// OL → id
// LI → id, class

// elementsCreator(tag, id, ElementClass, innerHTMLText, src, alt, title, type, maxLength, hidden, eventListener)

function elementsCreator(tag, id, ElementClass, innerHTMLText, src, alt, title, type, maxLength, hidden, style, eventListener) {
    const newElement = document.createElement(tag.toUpperCase());
    if(id) newElement.setAttribute('id', id);
    if(ElementClass) newElement.setAttribute('class', ElementClass);
    if(innerHTMLText) newElement.innerHTML = innerHTMLText;
    if(src) newElement.setAttribute('src', src);
    if(alt) newElement.setAttribute('alt', alt);
    if(title) newElement.setAttribute('title', title);
    if(type) newElement.setAttribute('type', type);
    if(maxLength) newElement.setAttribute('maxlength', maxLength);
    if(hidden) newElement.setAttribute('hidden', hidden);
    if(style) newElement.setAttribute('style', `${style[0]}: ${style[1]};`);
    if(eventListener) newElement.addEventListener(eventListener[0], eventListener[1]);
    return newElement;
};

function severalAppends(father, children) {
    children.forEach(child => {
        father.appendChild(child);
    });
};

function blockConstructor(  isNew,
                            allowInitialData,
                            dataToInsert = initialDescriptions,
                            blocksNumber,
                            descriptionsNumber) {
    let n;
    let m;
    const name = dataToInsert[0].name
    allowInitialData ? n = dataToInsert.length - 1 : n = blocksNumber;
    allowInitialData ? m = dataToInsert[0].descriptionsInBlock : m = descriptionsNumber;
    const blocksContainer = document.getElementById('blocks-container');
    const scheduleBlocks = [];
    isNew && scheduleBlocks.push(name);
    for(let i = 0; i < n; i++) {
        const block = elementsCreator("DIV", `block-${i+1}`, 'block');
            const blockAdvancedOptions = elementsCreator("DIV", `block-advanced-options-${i+1}`, 'block-advanced-options');
                const optionsBlockButton = elementsCreator("IMG", `advanced-${i+1}`, 'icon-button-options', false, 'images/2000px-Gnome-preferences-system.png', 'Block options', 'Opciones del bloque');
            blockAdvancedOptions.appendChild(optionsBlockButton);    
            const title = elementsCreator("DIV", `title-${i+1}`, 'title');
                const titleNumber = elementsCreator("SPAN", `titleNumber-${i+1}`, 'titleNumber', `${i+1}`);
                let headingText = '';
                allowInitialData ? headingText = dataToInsert[i + 1][0] : headingText = `Título ${i+1}`
                const heading =  elementsCreator("h3", `description-${i+1}-t`, 'title-description', headingText);
                isNew && scheduleBlocks.push(headingText);
                const input = elementsCreator("input", `input-${i + 1}-t`, 'title-i', false, false, false, false, 'hidden', '60');
                const buttonInsert = elementsCreator("button", `insert-${i + 1}-t`, 'button-edit-t', 'insertar', false, false, false, false, false, 'hidden');
                const buttonDelete = elementsCreator("button", `delete-${i + 1}-t`, 'button-edit-t', 'borrar', false, false, false, false, false, 'hidden');
            severalAppends(title, [titleNumber, heading, input, buttonInsert, buttonDelete]);
            descriptionInputControls(title);
            const blockOptions = elementsCreator("DIV", `block-options-${i+1}`, 'block-options');
                const checkAllContainer = elementsCreator("DIV", `checkallcontainer-${i+1}`, 'checkallcontainer');
                    const checkAll = elementsCreator("DIV", `checkall-${i+1}`, 'checkall', false, false, false, 'marcar/desmarcar todo');
                checkAllContainer.appendChild(checkAll);
                const checksCounterContainer = elementsCreator("div", `checkcounter-${i+1}`, 'checkcounter');
                    const span1 = elementsCreator("span", `span1-${i+1}`, 'span1');
                    const span2 = elementsCreator("span", `span2-${i+1}`, 'span2', ' de ');
                    const span3 = elementsCreator("span", `span3-${i+1}`, 'span3');
                severalAppends(checksCounterContainer, [span1, span2, span3]);
                const emptySpace = elementsCreator("div", `emptyspace-${i+1}`, 'emptyspace');
                const percentage = elementsCreator("div", `percentage-${i+1}`, 'percentage');
            // blockOptions.appendChild(checkAll);
            severalAppends(blockOptions, [checkAllContainer, checksCounterContainer, emptySpace, percentage]);
            //     const label = document.createElement("LABEL");
            //     label.setAttribute("id", `label-${i+1}`);
            //     label.setAttribute("class", 'label');
            //     label.setAttribute("for", `checkall-${i+1}`);
            //     label.innerHTML = 'marcar/desmarcar todo'
            // blockOptions.appendChild(label);
            const list = elementsCreator("DIV", `list-${i+1}`, 'list');  
                const ol = elementsCreator("ol", `ol-${i+1}`);
                const blockDescriptions = [];
                isNew && blockDescriptions.push(headingText);
                let counterChecks = 0;
                let counterDescriptions = 0;
                for(let j = 0; j < m; j++) {
                    let descriptionText = '';
                    let checkText = '';
                    let descriptionClass = 'description';
                    let visibility = 'hidden';
                    if(allowInitialData && (dataToInsert[i + 1].length > j + 1)) {
                        descriptionText = dataToInsert[i + 1][j + 1][1];
                        checkText = dataToInsert[i + 1][j + 1][0];
                        if(descriptionText) {
                            counterDescriptions++;
                            visibility = 'visible';
                        }
                        if(checkText) {
                            descriptionClass = 'description-checked';
                            counterChecks++;
                        }
                    };
                    const li = elementsCreator("li", `li-${j+1 +i*m}`);
                        const check = elementsCreator("DIV", `check-${j+1 +i*m}`, 'check', checkText, false, false, false, false, false, false, ['visibility', visibility]);
                        const descriptionNumber = elementsCreator("SPAN", `descriptionNumber-${j+1 +i*m}`, 'descriptionNumber', `${j+1}`); // delete innerText (`${j+1}`) in order to recount only non empty descriptions
                        const description = elementsCreator("DIV", `description-${j+1 +i*m}`, descriptionClass, descriptionText);
                    isNew && blockDescriptions.push([checkText, descriptionText]);
                        const input = elementsCreator("input", `input-${j+1 +i*m}`, 'input-description', false, false, false, false, 'hidden', '60');
                        const buttonInsert = elementsCreator("button", `insert-${j+1 +i*m}`, 'button-edit', 'insertar', false, false, false, false, false, 'hidden');
                        const buttonDelete = elementsCreator("button", `delete-${j+1 +i*m}`, 'button-edit', 'borrar', false, false, false, false, false, 'hidden');
                    severalAppends(li, [check, descriptionNumber, description, input, buttonInsert, buttonDelete]);
                    descriptionInputControls(li);
                    ol.appendChild(li);
                };
                isNew && saveData(`${name}-${i + 1}`, blockDescriptions);
                if(counterChecks === counterDescriptions && counterDescriptions) checkAll.innerHTML = '✓';
            list.appendChild(ol);
        severalAppends(block, [blockAdvancedOptions, title, blockOptions, list]);
        blockEventDetector(block);
        counterDescriptionsChecks(ol, false, span1, span3, percentage, blockOptions, checkAll);
        blocksContainer.appendChild(block);
    };
    isNew && saveData(`${name}-titles`, scheduleBlocks);
    // checkall
};
