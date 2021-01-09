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
};
