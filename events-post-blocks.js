function descriptionInputControls(element) {
    element.addEventListener('click',  (event) => {
      const target = event.target;
      if (target.tagName === 'LI' || target.className === 'titleNumber' ||  target.className === 'descriptionNumber' || target.classList.contains('description') || target.classList.contains('description-checked') || target.className === 'title'  || target.className === 'title-description') {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        let descriptionId = `description-${identifier}`
        let inputId = `input-${identifier}`
        let buttonInsertId = `insert-${identifier}`
        let buttonDeleteId = `delete-${identifier}`
        if(target.classList.contains('title') || target.classList.contains('title-description') || target.className === 'titleNumber') {
          descriptionId += `-t`;
          inputId += `-t`;
          buttonInsertId += `-t`;
          buttonDeleteId += `-t`;
        };

        const description = document.getElementById(descriptionId);
        const input = document.getElementById(inputId);
        const buttonInsert = document.getElementById(buttonInsertId);
        const buttonDelete = document.getElementById(buttonDeleteId);


        disableControls(input);
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

    element.addEventListener('mouseover', event => {
      const target = event.target;
      if (target.tagName === 'LI' || target.className === 'descriptionNumber' || target.classList.contains('description')) {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        const description = document.getElementById(`description-${identifier}`);
        // if(!description.innerHTML) return;
        const number = document.getElementById(`descriptionNumber-${identifier}`);
        number.setAttribute('style', 'color: black;');
      }
    });

    element.addEventListener('mouseleave', event => {
      const target = event.target;
      if (target.tagName === 'LI' || target.className === 'descriptionNumber' || target.classList.contains('description')) {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        const number = document.getElementById(`descriptionNumber-${identifier}`);
        number.setAttribute('style', 'color: peachpuff;');
      }
    });

    element.addEventListener("keyup", (event) => {
      const target = event.target;
      if (target.tagName === 'INPUT') {
        if (event.keyCode === 13) insert(target);
        if (event.keyCode === 27) disableControls();
      }
  })
};

function blockEventDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      if (target.className === 'block' || target.className === 'block-advanced-options' || target.className === 'block-options' || target.tagName === 'OL' || target.className === 'list') {
        disableControls();
      };
      if(target.tagName = 'LI' || target.className === 'block-options' || target.className === 'block-advanced-options') {
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
                case 'checkall':
                    checkAll(target);
                    break;
                case 'advanced':
                    toggleBlockOptions(target);
                    break;
                default:
                    break;
            }
      }
    });
};
