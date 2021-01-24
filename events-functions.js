function newSchedule(element) {
    element.addEventListener('click', () => {
        if(!(element.id === 'import-button-2')) {
            document.getElementById('options-header-1').removeAttribute('hidden');        
            document.getElementById('header-inputs-1').removeAttribute('hidden');
            document.getElementById('button-create').setAttribute('style', "visibility: visible;");
            document.getElementById('name').focus();
        }
        const buttonNewSchedule = document.getElementById('new-schedule');
        const buttonInitTemplate = document.getElementById('init-template');
        const importContainer = document.getElementById('import-container');
        const buttonImportSchedule = document.getElementById('import-button-1');
        const buttonExportSchedule = document.getElementById('export-button');
        if(element.id === 'new-schedule') {
            if(element.isactive  === 'true') {  
                disableControlsHeader({id: 'header'});
                element.isactive = 'false';
                element.removeAttribute('style');
                return;
            };
            buttonInitTemplate.removeAttribute('style');
            buttonInitTemplate.isactive = 'false';
            buttonImportSchedule.removeAttribute('style');
            buttonImportSchedule.isactive = 'false';
            document.getElementById('header-inputs-2').removeAttribute('hidden');
            importContainer.setAttribute('hidden', 'hidden');
            document.getElementById('options-header-2').setAttribute('hidden', 'hidden');
            allowInitialData = false;
        } else if(element.id === 'init-template') {
            if(element.isactive === 'true') {
                disableControlsHeader({id: 'header'});
                element.isactive = 'false';
                element.removeAttribute('style');
                return;
            };
            buttonNewSchedule.removeAttribute('style');
            buttonNewSchedule.isactive = 'false';
            buttonImportSchedule.removeAttribute('style');
            buttonImportSchedule.isactive = 'false';
            document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
            importContainer.setAttribute('hidden', 'hidden');
            document.getElementById('options-header-2').setAttribute('hidden', 'hidden');
            allowInitialData = true;
        } else {
            if(element.isactive  === 'true') {  
                if(element.id === 'import-button-2') {
                    importContainer.setAttribute('hidden', 'hidden');
                    element.isactive = 'false';
                    element.removeAttribute('style');
                    buttonExportSchedule.removeAttribute('hidden');
                    return;
                };
                disableControlsHeader({id: 'header'});
                element.isactive = 'false';
                element.removeAttribute('style');
                return;
            };
            buttonExportSchedule.setAttribute('hidden', 'hidden');
            buttonNewSchedule.removeAttribute('style');
            buttonNewSchedule.isactive = 'false';
            buttonInitTemplate.removeAttribute('style');
            buttonInitTemplate.isactive = 'false';
            document.getElementById('options-header-1').setAttribute('hidden', 'hidden');
            document.getElementById('header-inputs-1').setAttribute('hidden', 'hidden');
            document.getElementById('header-inputs-2').setAttribute('hidden', 'hidden');
            importContainer.removeAttribute('hidden');
            document.getElementById('options-header-2').removeAttribute('hidden');
            allowInitialData = true;
        };
        element.setAttribute('style', "color: CadetBlue;");
        element.isactive = "true";
      })
};



function editHeaderControlActiveDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      disableControlsHeader(target);
    });
};

function addSchedule(element) {
    element.addEventListener('click', () => {
        const userButtons = document.getElementById('hide-header-buttons');
        const buttonsContainer = document.getElementById('header-schedule-options-2');
        const buttonsImportExport = document.getElementById('import-export-buttons');
        // const optionsHeader2 = document.getElementById('options-header-2');
        const optionsHeader = document.getElementById('options-header-1');
        if(userButtons.hidden){
            if(!buttonsContainer.hidden || !buttonsImportExport.hidden) {
                buttonsContainer.setAttribute('hidden', 'hidden');
                buttonsImportExport.setAttribute('hidden', 'hidden');
                // optionsHeader2.setAttribute('hidden', 'hidden');
            }
            userButtons.removeAttribute('hidden');
        } else {
            userButtons.setAttribute('hidden', 'hidden');
            optionsHeader.setAttribute('hidden', 'hidden');
            disableControlsHeader({id: 'header'})
        }
      });
};

function inputHeaderActiveDetector(element) {
    element.addEventListener("keyup", (event) => {
        if (event.keyCode === 27) disableControlsHeader({id: 'header'});
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
        disableControlsHeader({id: 'header'});
        window.scrollTo(0,0);
      });
};

function changeSchedule(element) {
    element.addEventListener('change', event => {
        const target = event.target;
        const name = target.value;
        renderBlocks(name);
        window.scrollTo(0,0);
    })
};

function scheduleOptions(element) {
    element.addEventListener('click', () => {
        const buttonsContainer = document.getElementById('header-schedule-options-2');
        const userButtons = document.getElementById('hide-header-buttons');
        const buttonsImportExport = document.getElementById('import-container');
        buttonsImportExport.setAttribute('hidden', 'hidden');
        if(buttonsContainer.hidden){
            if(!userButtons.hidden) {
                userButtons.setAttribute('hidden', 'hidden');
                disableControlsHeader({id: 'header'});
            };
            buttonsContainer.removeAttribute('hidden');
        } else {
            buttonsContainer.setAttribute('hidden', 'hidden');
            disableControlsHeader({id: 'header'});
        };
    });
};

function loadFiles(element) {
    element.addEventListener('click', () => {
        // loadFile();
        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
          };
          const input = document.getElementById('file-input');
          if (!input) {
            alert("Couldn't find the file-input element.");
          } else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
          } else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
          } else {
            const file = input.files[0];
            const fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
            input.value = null;
          disableControlsHeader({id: 'header'});
        };
    });
};

function importListener(element) {
    element.addEventListener('change', () => {
        const input = document.getElementById('file-input');
        const span = document.getElementById('import-selected');
        const button = document.getElementById('load-file');
        span.innerHTML = input.files[0].name;
        span.setAttribute('title', input.files[0].name);
        button.removeAttribute('hidden');
    });
};

function importExportButtons(element) {
    element.addEventListener('click', () => {
        const buttons = document.getElementById('import-export-buttons');
        const optionsHeader2 = document.getElementById('options-header-2');
        const buttonExportSchedule = document.getElementById('export-button');
        if(buttons.hidden || optionsHeader2.hidden) {
            buttons.removeAttribute('hidden');
            optionsHeader2.removeAttribute('hidden');
            buttonExportSchedule.removeAttribute('hidden');
        } else {
            disableControlsHeader({id: 'header'});
        };
    });
};

function exportSchedules(element) {
    element.addEventListener('click', () => {
    const data = localStorage, fileName = "mis-agendas.json";

    const a = document.createElement("a");
    document.getElementById('import-export-buttons').appendChild(a);
    a.style = "display: none";

    const json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        console.log(1);
        console.log(window.URL);
        window.URL.revokeObjectURL(url);
        disableControlsHeader({id: 'header'});
        a.parentNode.removeChild(a);
    });
}

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
        const newBlock = new Array(maxLength).fill(['', '']);
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

function deleteSchedule(element) {
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