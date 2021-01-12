function descriptionInputControls(element) {
    element.addEventListener('click',  (event) => {
      const target = event.target;
      if (target.tagName === 'LI' || target.tagName === 'SPAN' || target.classList.contains('description') || target.className === 'title') {
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

    element.addEventListener('mouseover', event => {
      const target = event.target;
      if (target.tagName === 'LI' || target.tagName === 'SPAN' || target.classList.contains('description')) {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        const number = document.getElementById(`descriptionNumber-${identifier}`);
        number.setAttribute('style', 'color: black;');
      }
    });

    element.addEventListener('mouseleave', event => {
      const target = event.target;
      if (target.tagName === 'LI' || target.tagName === 'SPAN' || target.classList.contains('description')) {
        const desID = target.getAttribute('id');
        const identifier = desID.split('-')[1];
        const number = document.getElementById(`descriptionNumber-${identifier}`);
        number.setAttribute('style', 'color: peachpuff;');
      }
    });
};

function blockEventDetector(element) {
    element.addEventListener('click', event => {
      const target = event.target;
      if (target.className === 'block' || target.className === 'block-advanced-options' || target.className === 'block-options' || target.tagName === 'OL' || target.className === 'list') {
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
    });
};
