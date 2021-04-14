function descriptionInputControls(element) {
	element.addEventListener('click', event => {
		const target = event.target;
		if (
			target.tagName === 'LI' ||
			target.className === 'titleNumber' ||
			target.className === 'descriptionNumber' ||
			target.classList.contains('description') ||
			target.classList.contains('description-checked') ||
			target.className === 'title' ||
			target.className === 'title-description'
		) {
			const desID = target.getAttribute('id');
			const identifier = desID.split('-')[1];
			let descriptionId = `description-${identifier}`;
			let inputId = `input-${identifier}`;
			let buttonInsertId = `insert-${identifier}`;
			let buttonDeleteId = `delete-${identifier}`;
			if (
				target.classList.contains('title') ||
				target.classList.contains('title-description') ||
				target.className === 'titleNumber'
			) {
				descriptionId += `-t`;
				inputId += `-t`;
				buttonInsertId += `-t`;
				buttonDeleteId += `-t`;
			}

			const description = document.getElementById(descriptionId);
			const input = document.getElementById(inputId);
			const buttonInsert = document.getElementById(buttonInsertId);
			const buttonDelete = document.getElementById(buttonDeleteId);

			disableControls(input);
			let typeInput;
			input.getAttribute('type') === 'hidden'
				? (typeInput = 'text')
				: (typeInput = 'hidden');
			input.setAttribute('type', typeInput);
			if (description.innerText.trim()) {
				buttonInsert.innerText = 'editar';
				input.value = description.innerText.trim();
			}
			if (typeInput === 'text') {
				description.setAttribute('hidden', 'hidden');
				buttonInsert.removeAttribute('hidden');
				buttonDelete.removeAttribute('hidden');
				editControlsActive = [
					description,
					buttonInsert,
					buttonDelete,
					input
				];
				input.focus();
			} else {
				buttonInsert.setAttribute('hidden', 'hidden');
				buttonDelete.setAttribute('hidden', 'hidden');
				description.removeAttribute('hidden');
			}
		}
	});

	element.addEventListener('mouseover', event => {
		const target = event.target;
		const [identifier, isTitle] = elementToModify(target);
		const [
			blockArray,
			blockNumber,
			indexArray,
			name,
			blocksLength
		] = blockId(identifier, isTitle);
		const block = document.getElementById(`block-${blockNumber}`);
		block.counter = block.getAttribute('counter');
		// descriptionNumberVisibility[blockNumber];
		if (block.counter === 'hidden') {
			if (
				target.tagName === 'LI' ||
				target.className === 'descriptionNumber' ||
				target.classList.contains('description')
			) {
				const desID = target.getAttribute('id');
				const identifier = desID.split('-')[1];
				// const description = document.getElementById(`description-${identifier}`);
				// if (!description.innerHTML) return;
				const number = document.getElementById(
					`descriptionNumber-${identifier}`
				);
				number.setAttribute('style', 'color: black;');
			}
		}
	});

	element.addEventListener('mouseleave', event => {
		const target = event.target;
		const [identifier, isTitle] = elementToModify(target);
		const [
			blockArray,
			blockNumber,
			indexArray,
			name,
			blocksLength
		] = blockId(identifier, isTitle);
		const block = document.getElementById(`block-${blockNumber}`);
		block.counter = block.getAttribute('counter');
		if (block.counter === 'hidden') {
			if (
				target.tagName === 'LI' ||
				target.className === 'descriptionNumber' ||
				target.classList.contains('description')
			) {
				const desID = target.getAttribute('id');
				const identifier = desID.split('-')[1];
				const number = document.getElementById(
					`descriptionNumber-${identifier}`
				);
				number.setAttribute('style', 'color: peachpuff;');
			}
		}
	});

	element.addEventListener('keyup', event => {
		const target = event.target;
		let [identifier, isTitle] = elementToModify(target);
		const [
			blockArray,
			blockNumber,
			indexArray,
			name,
			blocksLength
		] = blockId(identifier, isTitle);
		if (target.tagName === 'INPUT') {
			if (event.keyCode === 13) {
				insert(target);
				if (!isTitle && indexArray !== blocksLength) {
					document.getElementById(`li-${++identifier}`).click();
				}
			}
			if (event.keyCode === 27) disableControls();
		}
	});
}

function blockEventDetector(element) {
	element.addEventListener('click', event => {
		const target = event.target;
		if (target.tagName === 'OPTION') return;
		const [type, identifier] = target.getAttribute('id').split('-');
		if (
			target.className === 'block' ||
			target.className === 'block-advanced-options' ||
			target.className === 'block-counter' ||
			target.tagName === 'OL' ||
			target.className === 'list' ||
			target.className === 'manageContainer'
		) {
			disableControls();
			disableBlockOptionsManagement(identifier);
		}
		if (
			(target.tagName =
				'LI' ||
				target.className === 'block-counter' ||
				target.className === 'block-advanced-options')
		) {
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
					toggleBlockOptions(identifier);
					break;
				case 'config':
					showBlockOptionsContainers(type, identifier);
					break;
				case 'move':
					showBlockOptionsContainers(type, identifier);
					break;
				// case 'moveSelector':
				//     console.log(type, identifier);
				//     break;
				case 'copy':
					showBlockOptionsContainers(type, identifier);
					break;
				case 'copyButton':
					copyBlock(type, identifier);
					break;
				case 'clean':
					showBlockOptionsContainers(type, identifier);
					break;
				case 'deleteBlock':
					showBlockOptionsContainers(
						'confirm',
						identifier,
						type,
						'¿Eliminar este bloque?'
					);
					break;
				case 'confirmAcceptButton':
					confirmActionBlock(type, identifier);
					break;
				case 'confirmCancelButton':
					confirmActionBlock(type, identifier);
					break;
				case 'cleanButton':
					cleanDescriptions(identifier);
					break;
				case 'sortButton':
					sortDescriptions(identifier);
					break;
				default:
					break;
			}
		}
	});

	element.addEventListener('change', event => {
		const target = event.target;
		if (target.className === 'moveSelector') {
			const position = Number(target.value);
			const actual = Number(target.getAttribute('actual'));
			sortBlocks(actual, position);
		}
		if (target.className === 'copySelector') {
			const position = Number(target.value);
			const actual = Number(target.getAttribute('actual'));
			const copyButtonContainer = document.getElementById(
				`copyButtonContainer-${actual}`
			);
			const copyButton = document.getElementById(`copyButton-${actual}`);
			if (position !== actual) {
				copyButtonContainer.removeAttribute('hidden');
				copyButton.setAttribute('position', position);
			} else {
				copyButtonContainer.setAttribute('hidden', 'hidden');
				copyButton.removeAttribute('position');
			}
		}
	});
}
