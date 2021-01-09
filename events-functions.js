function newSchedule(element) {
    element.addEventListener('click', () => {
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



function editHeaderControlActiveDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      desactiveControlsHeader(target);
    });
};

function addSchedule(element) {
    element.addEventListener('click', () => {
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
};

function inputHeaderActiveDetector(element) {
    element.addEventListener("keyup", (event) => {
        if (event.keyCode === 27) desactiveControlsHeader({id: 'header'});
    });
};

function create(element) {
    element.addEventListener('click', () => {
        const inputName = document.getElementById('name');
        const inputBlocksNumber = document.getElementById('blocks-number');
        const inputDescriptionsNumber = document.getElementById('descriptions-number');
        let schedules = getData('schedules');
        const scheduleName = inputName.value.trim();
        if(!scheduleName) {
            alert('Debes introducir un nombre');
            return;
        };
        if(schedules){
            let isValidName = true;
            schedules.forEach(element => {
                if(typeof element !== 'object') {
                    if(element.toLowerCase() === scheduleName.toLowerCase()) {
                        alert('Ese nombre de agenda ya existe');
                        isValidName = false;
                        return;
                    };
                }
            });
            if(!isValidName) return
            schedules.push(scheduleName);
            schedules[0].activeSchedule = scheduleName;
            saveData('schedules', schedules);
            const blocksContainer = document.getElementById('blocks-container');
            blocksContainer.innerHTML = '';
        } else {
            saveData('schedules', [{activeSchedule: scheduleName}, scheduleName]);
        }
        initialDescriptions[0].name = scheduleName;
        schedules = getData('schedules');
        if(allowInitialData) blockConstructor(true, allowInitialData)
        else blockConstructor(true, false, [{name: scheduleName}], inputBlocksNumber.value, inputDescriptionsNumber.value);
        setSchedulesToOptions(schedules);
        desactiveControlsHeader({id: 'header'});
      });
};

function changeSchedule(element) {
    element.addEventListener('change', event => {
        const target = event.target;
        const name = target.value;
        renderBlocks(name);
    })
};

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
};

function deleteAll(element) {
    element.addEventListener('click', () => {
        const isConfirmed = confirm("Borrar todas las agendas \nes una acción que no se puede deshacer");
        if(isConfirmed) {
            deleteAllSchedules();
        } else return;
    });
};

function newBlock(element) {
    element.addEventListener('click', () => {
        const [name, titles, titlesLength , maxLength] = maxLengthBlock();
        const newBlock = new Array(maxLength - 1).fill(['', '']);
        newBlock[0] = `Título ${titlesLength}`;
        titles.push(`Título ${titlesLength}`);
        saveData(`${name}-titles`, titles);
        saveData(`${name}-${titlesLength}`, newBlock);
        renderBlocks();
        alert(`Un nuevo bloque ha sido añadido \n [Título ${titlesLength}]`);
    });
};

function cleanBlocks(element) {
    element.addEventListener('click', () => {
        const isConfirmed = confirm("Esta acción no se puede deshacer");
            if(isConfirmed) {
                const [name, titles, titlesLength , maxLength] = maxLengthBlock();
                // const newTitles = new Array(titlesLength); // * allow reset titles too
                // newTitles[0] = name; // *
                for (let i = 0; i < titlesLength - 1; i++) {
                    // newTitles[i + 1] = `Título ${i + 1}`; // *
                    const newBlock = new Array(maxLength).fill(['', '']);
                    // newBlock[0] = `Título ${i + 1}`; // *
                    newBlock[0] = titles[i + 1];
                    saveData(`${name}-${i + 1}`, newBlock);
                };
                // saveData(`${name}-titles`, newTitles); // * 
                renderBlocks();
            } else return;
    });
};

function deleteBlock(element) {
    element.addEventListener('click', () => {
        let schedules = getData('schedules');
        if(schedules.length === 2) {
            const isConfirmed = confirm("Borrar esta agenda es una acción que no se puede deshacer");
            if(isConfirmed) {
                deleteAllSchedules();
            } else return;
        } else {
            const deleteThisSchedule = confirm("Borrar esta agenda es una acción que no se puede deshacer");
            if(deleteThisSchedule) {
                let name = schedules[0].activeSchedule;
                const titles = getData(`${name}-titles`);
                for(let i = 1; i !== titles.length; i++) {
                    deleteData(`${name}-${i}`);
                };
                deleteData(`${name}-titles`);
                const indexToDelete = schedules.findIndex(element => element === name);
                schedules.splice(indexToDelete, 1);
                saveData('schedules', schedules);
                setSchedulesToOptions(schedules);
                name = getData('schedules')[1];
                renderBlocks(name);
            } else return;
        };
    });
};