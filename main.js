function  main() {
  let blocksNumber;
  let allowInitialData = false;
  let editControlsActive = [];
  const initialDescriptions = [
    [ {
      name: 'Carlos',
    }],
    [ 'Inicio del día',
      'Baño',
      'Computadora',
      'Peso',
      'Desayuno',
      'Noticias',
      'Ojos',
      'Retención',
      'Mecanografía',
      'Inglés' ],
    [ 'Actividades',
      'Resúmenes',
      'Programación',
      'Alterna',
      'Abuelo',
      'Actividades de repaso (AR)',
      'UCV' ],
    [ 'Valentina',
      'Lectura',
      'Matemáticas',
      'Inglés',
      'Programación',
      'Deporte',
      'Guitarra',
      'Liceo',
      'Vocabulario y ortografía',
      'AR, cultura general e historia' ],
    [ 'Final del día',
      'Morral: agua, papel, paraguas, bolsita de plástico',
      'Bañarme',
      'Desayuno: armar agua y harina',
      'Cena y preparar almuerzo',
      'Limpieza de dientes',
      'Actividades de Valentina',
      'Cepillado',
      'Armar agenda',
      'Armar ropa' ]
  ];

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
      if(editControlsActive[0].getAttribute('id') !== element.getAttribute('id')){
        editControlsActive[0].removeAttribute('hidden');
        editControlsActive[1].setAttribute('hidden', 'hidden');
        editControlsActive[2].setAttribute('hidden', 'hidden');
        editControlsActive[3].setAttribute('type', 'hidden');
        editControlsActive = [];
      }
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
          description = document.getElementById(`h3-${identifier}`);
          input = document.getElementById(`input-${identifier}-t`);
          buttonInsert = document.getElementById(`insert-${identifier}-t`);
          buttonDelete = document.getElementById(`delete-${identifier}-t`);
        };

        desactiveControls(description);
        
        let typeInput;
        input.getAttribute('type') === 'hidden' ? typeInput = 'text' : typeInput = 'hidden';
        input.setAttribute('type', typeInput);
        if(description.innerText.trim()) {
          buttonInsert.innerText = "editar";
          input.setAttribute('value', description.innerText.trim());
        };
        if(typeInput === 'text') {
          description.setAttribute('hidden', 'hidden');
          buttonInsert.removeAttribute('hidden');
          buttonDelete.removeAttribute('hidden');
          editControlsActive = [description, buttonInsert, buttonDelete, input];
        } else {
          buttonInsert.setAttribute(typeInput, typeInput);
          buttonDelete.setAttribute(typeInput, typeInput);
          description.removeAttribute('hidden');
        };
      }
    });
  };

  function editControlActiveDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      if (target.className === 'block') {
        desactiveControls(element);
      }
    })
  }
  
  function saveData(dataSet) {
    localStorage.setItem('key', JSON.stringify(dataSet));
  };
  function deleteData(name) {
    localStorage.removeItem('key');
  };

  function blockConstructor(blocksNumber = 4, allowInitialData, dataToInsert = initialDescriptions, isEditControlActive) {
    let n;
    allowInitialData ? n = dataToInsert.length - 1 : n = blocksNumber;
    const blocksContainer = document.getElementById('blocks-container');
    for(let i = 0; i < n; i++) {
      const block = document.createElement("DIV");
          block.setAttribute("id", `block-${i+1}`);
          block.setAttribute("class", 'block');
  
              const title = document.createElement("DIV");  
                  title.setAttribute("id", `title-${i+1}`);
                  title.setAttribute("class", 'title');
                      const heading = document.createElement("h3");  
                      heading.setAttribute("id", `h3-${i+1}`);
                      heading.setAttribute("class", 'title');
                  title.appendChild(heading);
                  allowInitialData ? heading.innerHTML = dataToInsert[i + 1][0] : heading.innerHTML = `Título ${i+1}`
                      const input = document.createElement("input");
                      input.setAttribute("id", `input-${i + 1}-t`);
                      input.setAttribute("class", 'title-i');
                      input.setAttribute("maxlength", '60');
                      input.setAttribute("type", 'hidden');
                  title.appendChild(input);
                      const buttonInsert = document.createElement("button");
                      buttonInsert.setAttribute("id", `insert-${i + 1}-t`);
                      buttonInsert.setAttribute("class", 'button-edit');
                      buttonInsert.setAttribute("hidden", 'hidden');
                      buttonInsert.innerHTML = 'insertar';
                  title.appendChild(buttonInsert);
                      const buttonDelete = document.createElement("button");
                      buttonDelete.setAttribute("id", `delete-${i + 1}-t`);
                      buttonDelete.setAttribute("class", 'button-delete');
                      buttonDelete.setAttribute("hidden", 'hidden');
                      buttonDelete.innerHTML = 'borrar';
                  title.appendChild(buttonDelete);
          block.appendChild(title);
          descriptionInputControls(title);
              const list = document.createElement("DIV");  
                  list.setAttribute("id", `list-${i+1}`);
                  list.setAttribute("class", 'list');
                      const ol = document.createElement("ol");  
                      ol.setAttribute("id", `ol-${i+1}`);
                      for(let j = 0; j < 9; j++) {
                        const li = document.createElement("li");
                        li.setAttribute("id", `li-${j+1 +i*9}`);
                            const check = document.createElement("DIV");
                            check.setAttribute("id", `check-${j+1 +i*9}`);
                            check.setAttribute("class", 'check');
                        li.appendChild(check);
                            const description = document.createElement("DIV");
                            description.setAttribute("id", `description-${j+1 +i*9}`);
                            description.setAttribute("class", 'description');
                        li.appendChild(description);
                        if(allowInitialData && (dataToInsert[i + 1].length > j + 1)) {
                          description.innerHTML = dataToInsert[i + 1][j + 1];
                        }
                            const input = document.createElement("input");
                            input.setAttribute("id", `input-${j+1 +i*9}`);
                            input.setAttribute("maxlength", '60');
                            input.setAttribute("type", 'hidden');
                        li.appendChild(input);
                            const buttonInsert = document.createElement("button");
                            buttonInsert.setAttribute("id", `insert-${j+1 +i*9}`);
                            buttonInsert.setAttribute("class", 'button-edit');
                            buttonInsert.setAttribute("hidden", 'hidden');
                            buttonInsert.innerHTML = 'insertar';
                        li.appendChild(buttonInsert);
                            const buttonDelete = document.createElement("button");
                            buttonDelete.setAttribute("id", `delete-${j+1 +i*9}`);
                            buttonDelete.setAttribute("class", 'button-delete');
                            buttonDelete.setAttribute("hidden", 'hidden');
                            buttonDelete.innerHTML = 'borrar';
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
  let dataSet;
  const storagedData = JSON.parse(localStorage.getItem('key'));
    if(storagedData){
      allowInitialData = true;
    }
  blockConstructor(blocksNumber = 5, allowInitialData = true, dataSet);
}