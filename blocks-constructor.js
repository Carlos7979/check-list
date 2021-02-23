function elementsCreator(tag, id, ElementClass, innerHTMLText, attributes, eventListener) {
  const newElement = document.createElement(tag.toUpperCase());
  if (id) newElement.setAttribute('id', id);
  if (ElementClass) newElement.setAttribute('class', ElementClass);
  if (innerHTMLText) newElement.innerHTML = innerHTMLText;
  // src, alt, title, type, maxLength, hidden, style
  if (attributes) {
    for (const key in attributes) {
      if (key === 'style') {
        const stylesObject = attributes[key];
        let textStyles = '';
        for (const styleKey in stylesObject) {
          textStyles += `${styleKey}: ${stylesObject[styleKey]}; `;
        }
        newElement.setAttribute(key, textStyles);
      } else {
        newElement.setAttribute(key, attributes[key]);
      }
    }
  }
  if (eventListener) newElement.addEventListener(eventListener[0], eventListener[1]);
  return newElement;
}

function severalAppends(father, children) {
  children.forEach((child) => {
    father.appendChild(child);
  });
}

function blockConstructor(
  isNew,
  allowInitialData,
  dataToInsert = initialDescriptions,
  blocksNumber,
  descriptionsNumber
) {
  let n;
  let m;
  const name = dataToInsert[0].name;
  allowInitialData ? (n = dataToInsert.length - 1) : (n = blocksNumber);
  allowInitialData ? (m = dataToInsert[0].descriptionsInBlock) : (m = descriptionsNumber);
  const blocksContainer = document.getElementById('blocks-container');
  const scheduleBlocks = [];
  isNew && scheduleBlocks.push(name);
  for (let i = 0; i < n; i++) {
    // level 1
    const block = elementsCreator('DIV', `block-${i + 1}`, 'block', false, {counter: 'hidden'});
    // open level 2 blockAdvancedOptions
    const blockAdvancedOptions = elementsCreator(
      'DIV',
      `blockAdvancedOptions-${i + 1}`,
      'block-advanced-options'
    );
    const blockAdvancedPrimaryContainer = elementsCreator(
      'div',
      `blockAdvancedPrimaryContainer-${i + 1}`,
      'blockAdvancedPrimaryContainer'
    );
    const hideOptionsIconsContainer = elementsCreator(
      'div',
      `hideOptionsIconsContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const configContainer = elementsCreator(
      'div',
      `configContainer-${i + 1}`,
      'block-advanced-icons-containers'
    );
    const config = elementsCreator('img', `config-${i + 1}`, 'config-button-block', false, {
      src: 'images/preferences-system.png',
      alt: 'Block config',
      title: 'Configuraciones del bloque',
    });
    configContainer.appendChild(config);
    const moveContainer = elementsCreator(
      'div',
      `moveContainer-${i + 1}`,
      'block-advanced-icons-containers'
    );
    const move = elementsCreator('img', `move-${i + 1}`, 'icon-button-block', false, {
      src: 'images/transferencia-datos.png',
      alt: 'Block move',
      title: 'Mover bloque',
    });
    moveContainer.appendChild(move);
    const copyContainer = elementsCreator(
      'div',
      `copyContainer-${i + 1}`,
      'block-advanced-icons-containers'
    );
    const copy = elementsCreator('img', `copy-${i + 1}`, 'copy-button-block', false, {
      src: 'images/copy-and-paste.png',
      alt: 'Block copy',
      title: 'Copiar bloque',
    });
    copyContainer.appendChild(copy);
    const cleanContainer = elementsCreator(
      'div',
      `cleanContainer-${i + 1}`,
      'block-advanced-icons-containers'
    );
    const clean = elementsCreator('img', `clean-${i + 1}`, 'icon-button-block', false, {
      src: 'images/edit-clear.svg',
      alt: 'Block clean',
      title: 'Limpiar bloque',
    });
    cleanContainer.appendChild(clean);
    const deleteContainer = elementsCreator(
      'div',
      `deleteContainer-${i + 1}`,
      'block-advanced-icons-containers'
    );
    const deleteBlock = elementsCreator('img', `deleteBlock-${i + 1}`, 'icon-button-block', false, {
      src: 'images/window-close.svg',
      alt: 'Block delete',
      title: 'Eliminar bloque',
    });
    deleteContainer.appendChild(deleteBlock);
    severalAppends(hideOptionsIconsContainer, [
      moveContainer,
      copyContainer,
      cleanContainer,
      deleteContainer,
    ]);
    // Add configContainer when it be implemented
    // severalAppends(hideOptionsIconsContainer, [
    //   configContainer,
    //   moveContainer,
    //   copyContainer,
    //   cleanContainer,
    //   deleteContainer
    // ]);
    const configHideManageContainer = elementsCreator(
      'div',
      `configHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const configManageContainer = elementsCreator(
      'div',
      `configManageContainer-${i + 1}`,
      'manageContainer'
    );
    const testShowConfigBlock = elementsCreator(
      'div',
      `testConfig-${i + 1}`,
      'testConfig',
      'Configurar bloque aún no implementado'
    );
    configManageContainer.appendChild(testShowConfigBlock);
    severalAppends(configHideManageContainer, [configManageContainer]);
    const moveHideManageContainer = elementsCreator(
      'div',
      `moveHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const moveManageContainer = elementsCreator(
      'div',
      `moveManageContainer-${i + 1}`,
      'manageContainer'
    );
    const [moveSelector, moveArray] = blockSelector('move', 'Mover bloque', i, n);
    severalAppends(moveSelector, moveArray);
    const labelMoveBlock = elementsCreator(
      'label',
      `labelMove-${i + 1}`,
      'labelMove',
      'Cambiar de posición este bloque',
      {for: `moveSelector-${i + 1}`}
    );
    severalAppends(moveManageContainer, [moveSelector, labelMoveBlock]);
    moveHideManageContainer.appendChild(moveManageContainer);
    const copyHideManageContainer = elementsCreator(
      'div',
      `copyHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const copyManageContainer = elementsCreator(
      'div',
      `copyManageContainer-${i + 1}`,
      'manageContainer'
    );
    const [copySelector, copyArray] = blockSelector('copy', 'Copiar bloque', i, n);
    severalAppends(copySelector, copyArray);
    const labelCopyBlock = elementsCreator(
      'label',
      `labelCopy-${i + 1}`,
      'labelCopy',
      'Copiar el contenido del bloque:',
      {for: `copySelector-${i + 1}`}
    );
    const copyButtonContainer = elementsCreator(
      'span',
      `copyButtonContainer-${i + 1}`,
      'copyButtonContainer',
      false,
      {hidden: 'hidden'}
    );
    const copyButton = elementsCreator('span', `copyButton-${i + 1}`, 'button-darkgreen', 'Copiar');
    copyButtonContainer.appendChild(copyButton);
    severalAppends(copyManageContainer, [labelCopyBlock, copySelector, copyButtonContainer]);
    severalAppends(copyHideManageContainer, [copyManageContainer]);
    const cleanHideManageContainer = elementsCreator(
      'div',
      `cleanHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const cleanManageContainer = elementsCreator(
      'div',
      `cleanManageContainer-${i + 1}`,
      'manageContainer'
    );
    const cleanText = elementsCreator(
      'span',
      `cleanText-${i + 1}`,
      'cleanText',
      'Nada por limpiar',
      {hidden: 'hidden'}
    );
    const cleanButtonContainer = elementsCreator(
      'span',
      `cleanButtonContainer-${i + 1}`,
      'cleanButtonContainer'
    );
    const cleanButton = elementsCreator(
      'span',
      `cleanButton-${i + 1}`,
      'button-darkgreen-confirm-block',
      'Limpiar actividades realizadas',
      {hidden: 'hidden'}
    );
    cleanButtonContainer.appendChild(cleanButton);
    const sortButtonContainer = elementsCreator(
      'span',
      `sortButtonContainer-${i + 1}`,
      'sortButtonContainer'
    );
    const sortButton = elementsCreator(
      'span',
      `sortButton-${i + 1}`,
      'button-darkgreen-confirm-block',
      'Desplazar espacios vacíos',
      {hidden: 'hidden'}
    );
    sortButtonContainer.appendChild(sortButton);
    severalAppends(cleanManageContainer, [cleanText, cleanButtonContainer, sortButtonContainer]);
    severalAppends(cleanHideManageContainer, [cleanManageContainer]);
    const deleteBlockHideManageContainer = elementsCreator(
      'div',
      `deleteBlockHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const deleteManageContainer = elementsCreator(
      'div',
      `deleteManageContainer-${i + 1}`,
      'manageContainer'
    );
    //     const testShowDeleteBlock = elementsCreator('div', `testDeleteBlock-${i +1}`, 'testDeleteBlock', 'Borrar bloque aún no implementado');
    // deleteManageContainer.appendChild(testShowDeleteBlock);
    severalAppends(deleteBlockHideManageContainer, [deleteManageContainer]);
    const confirmHideManageContainer = elementsCreator(
      'div',
      `confirmHideManageContainer-${i + 1}`,
      'hideOptionsIconsContainer',
      false,
      {hidden: 'hidden'}
    );
    const confirmManageContainer = elementsCreator(
      'div',
      `confirmManageContainer-${i + 1}`,
      'manageContainer'
    );
    const confirmText = elementsCreator('span', `confirmText-${i + 1}`, 'confirmText');
    const confirmAcceptButtonContainer = elementsCreator(
      'span',
      `confirmAcceptButtonContainer-${i + 1}`,
      'confirmButtonContainer'
    );
    const confirmAcceptButton = elementsCreator(
      'span',
      `confirmAcceptButton-${i + 1}`,
      'button-darkgreen-confirm-block',
      'Aceptar'
    );
    confirmAcceptButtonContainer.appendChild(confirmAcceptButton);
    const confirmCancelButtonContainer = elementsCreator(
      'span',
      `confirmCancelButtonContainer-${i + 1}`,
      'confirmButtonContainer'
    );
    const confirmCancelButton = elementsCreator(
      'span',
      `confirmCancelButton-${i + 1}`,
      'button-darkred-confirm-block',
      'Cancelar'
    );
    confirmCancelButtonContainer.appendChild(confirmCancelButton);
    severalAppends(confirmManageContainer, [
      confirmText,
      confirmAcceptButtonContainer,
      confirmCancelButtonContainer,
    ]);
    severalAppends(confirmHideManageContainer, [confirmManageContainer]);
    severalAppends(blockAdvancedPrimaryContainer, [
      hideOptionsIconsContainer,
      configHideManageContainer,
      moveHideManageContainer,
      copyHideManageContainer,
      cleanHideManageContainer,
      deleteBlockHideManageContainer,
      confirmHideManageContainer,
    ]);
    const optionsBlockButton = elementsCreator(
      'IMG',
      `advanced-${i + 1}`,
      'icon-button-options',
      false,
      {
        src: 'images/2000px-Gnome-preferences-system.png',
        alt: 'Block options',
        title: 'Opciones del bloque',
      }
    );
    // close level 2 blockAdvancedOptions
    severalAppends(blockAdvancedOptions, [blockAdvancedPrimaryContainer, optionsBlockButton]);
    const title = elementsCreator('DIV', `title-${i + 1}`, 'title');
    const titleNumber = elementsCreator('SPAN', `titleNumber-${i + 1}`, 'titleNumber', `${i + 1}`);
    let headingText = '';
    allowInitialData ? (headingText = dataToInsert[i + 1][0]) : (headingText = `Título ${i + 1}`);
    const heading = elementsCreator(
      'h3',
      `description-${i + 1}-t`,
      'title-description',
      headingText,
      {title: headingText}
    );
    isNew && scheduleBlocks.push(headingText);
    const input = elementsCreator('input', `input-${i + 1}-t`, 'title-i', false, {
      type: 'hidden',
      maxLength: '60',
    });
    const buttonInsert = elementsCreator(
      'button',
      `insert-${i + 1}-t`,
      'button-edit-t',
      'insertar',
      {hidden: 'hidden'}
    );
    const buttonDelete = elementsCreator('button', `delete-${i + 1}-t`, 'button-edit-t', 'borrar', {
      hidden: 'hidden',
    });
    severalAppends(title, [titleNumber, heading, input, buttonInsert, buttonDelete]);
    descriptionInputControls(title);
    const blockCounter = elementsCreator('DIV', `block-counter-${i + 1}`, 'block-counter');
    const checkAllContainer = elementsCreator(
      'DIV',
      `checkallcontainer-${i + 1}`,
      'checkallcontainer'
    );
    const checkAll = elementsCreator('DIV', `checkall-${i + 1}`, 'checkall', false, {
      title: 'marcar/desmarcar todo',
    });
    checkAllContainer.appendChild(checkAll);
    const checksCounterContainer = elementsCreator('div', `checkcounter-${i + 1}`, 'checkcounter');
    const span1 = elementsCreator('span', `span1-${i + 1}`, 'span1');
    const span2 = elementsCreator('span', `span2-${i + 1}`, 'span2', ' de ');
    const span3 = elementsCreator('span', `span3-${i + 1}`, 'span3');
    severalAppends(checksCounterContainer, [span1, span2, span3]);
    const emptySpace = elementsCreator('div', `emptyspace-${i + 1}`, 'emptyspace');
    const percentage = elementsCreator('div', `percentage-${i + 1}`, 'percentage');
    // blockCounter.appendChild(checkAll);
    severalAppends(blockCounter, [
      checkAllContainer,
      checksCounterContainer,
      emptySpace,
      percentage,
    ]);
    //     const label = document.createElement("LABEL");
    //     label.setAttribute("id", `label-${i+1}`);
    //     label.setAttribute("class", 'label');
    //     label.setAttribute("for", `checkall-${i+1}`);
    //     label.innerHTML = 'marcar/desmarcar todo'
    // blockCounter.appendChild(label);
    const list = elementsCreator('DIV', `list-${i + 1}`, 'list');
    const ol = elementsCreator('ol', `ol-${i + 1}`);
    const blockDescriptions = [];
    isNew && blockDescriptions.push(headingText);
    let counterChecks = 0;
    let counterDescriptions = 0;
    for (let j = 0; j < m; j++) {
      let descriptionText = '';
      let checkText = '';
      let descriptionClass = 'description';
      let visibility = 'hidden';
      if (allowInitialData && dataToInsert[i + 1].length > j + 1) {
        descriptionText = dataToInsert[i + 1][j + 1][1];
        checkText = dataToInsert[i + 1][j + 1][0];
        if (descriptionText) {
          counterDescriptions++;
          visibility = 'visible';
        }
        if (checkText) {
          descriptionClass = 'description-checked';
          counterChecks++;
        }
      }
      const li = elementsCreator('li', `li-${j + 1 + i * m}`);
      const check = elementsCreator('DIV', `check-${j + 1 + i * m}`, 'check', checkText, {
        style: {visibility},
      });
      const descriptionNumber = elementsCreator(
        'SPAN',
        `descriptionNumber-${j + 1 + i * m}`,
        'descriptionNumber',
        `${j + 1}`
      ); // delete innerText (`${j+1}`) in order to recount only non empty descriptions; , {style: {color: 'black'}} in order to do visible this element
      const description = elementsCreator(
        'DIV',
        `description-${j + 1 + i * m}`,
        descriptionClass,
        descriptionText,
        {title: descriptionText}
      );
      isNew && blockDescriptions.push([checkText, descriptionText]);
      const input = elementsCreator('input', `input-${j + 1 + i * m}`, 'input-description', false, {
        type: 'hidden',
        maxLength: '60',
      });
      const buttonInsert = elementsCreator(
        'button',
        `insert-${j + 1 + i * m}`,
        'button-edit',
        'insertar',
        {hidden: 'hidden'}
      );
      const buttonDelete = elementsCreator(
        'button',
        `delete-${j + 1 + i * m}`,
        'button-edit',
        'borrar',
        {hidden: 'hidden'}
      );
      severalAppends(li, [
        check,
        descriptionNumber,
        description,
        input,
        buttonInsert,
        buttonDelete,
      ]);
      descriptionInputControls(li);
      ol.appendChild(li);
    }
    isNew && saveData(`${name}-${i + 1}`, blockDescriptions);
    if (counterChecks === counterDescriptions && counterDescriptions) checkAll.innerHTML = '✓';
    list.appendChild(ol);
    severalAppends(block, [blockAdvancedOptions, title, blockCounter, list]);
    blockEventDetector(block);
    counterDescriptionsChecks(ol, false, span1, span3, percentage, blockCounter, checkAll);
    blocksContainer.appendChild(block);
  }
  isNew && saveData(`${name}-titles`, scheduleBlocks);
  // checkall
}
