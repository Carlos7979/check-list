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
                const blockAdvancedOptions = document.createElement("DIV");
                    blockAdvancedOptions.setAttribute("id", `block-advanced-options-${i+1}`);
                    blockAdvancedOptions.setAttribute("class", `block-advanced-options`);
            block.appendChild(blockAdvancedOptions);
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
                        buttonInsert.setAttribute("class", 'button-edit-t');
                        buttonInsert.setAttribute("hidden", 'hidden');
                        buttonInsert.innerHTML = 'insertar';
                        buttonInsert.addEventListener('click', () => {       
                        });
                    title.appendChild(buttonInsert);
                        const buttonDelete = document.createElement("button");
                        buttonDelete.setAttribute("id", `delete-${i + 1}-t`);
                        buttonDelete.setAttribute("class", 'button-delete-t');
                        buttonDelete.setAttribute("hidden", 'hidden');
                        buttonDelete.innerHTML = 'borrar';
                        buttonDelete.addEventListener('click', () => {     
                        });
                    title.appendChild(buttonDelete);
            block.appendChild(title);
            descriptionInputControls(title);
                const blockOptions = document.createElement("DIV");
                    blockOptions.setAttribute("id", `block-options-${i+1}`);
                    blockOptions.setAttribute("class", `block-options`);
                        const checkAll = document.createElement("DIV");
                        checkAll.setAttribute("id", `checkall-${i+1}`);
                        checkAll.setAttribute("class", 'checkall');
                        checkAll.setAttribute("title", 'marcar/desmarcar todo');
                    blockOptions.appendChild(checkAll);
                    //     const label = document.createElement("LABEL");
                    //     label.setAttribute("id", `label-${i+1}`);
                    //     label.setAttribute("class", 'label');
                    //     label.setAttribute("for", `checkall-${i+1}`);
                    //     label.innerHTML = 'marcar/desmarcar todo'
                    // blockOptions.appendChild(label);
            block.appendChild(blockOptions);
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
                            const descriptionNumber = document.createElement("SPAN");
                            descriptionNumber.setAttribute("id", `descriptionNumber-${j+1 +i*m}`);
                            descriptionNumber.setAttribute("class", 'descriptionNumber');
                            descriptionNumber.innerHTML = `${j+1}`
                        li.appendChild(descriptionNumber);
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
                            if(checkText) {
                                description.setAttribute("class", 'description-checked');
                            }
                        }
                        isNew && blockDescriptions.push([checkText, descriptionText]);
                            const input = document.createElement("input");
                            input.setAttribute("id", `input-${j+1 +i*m}`);
                            input.setAttribute("class", 'input-description');
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
    // checkall
};
