let blocksNumber;
let descriptionsNumber;
let allowInitialData = false;
let dataSet;
let isLocalStorageEmpty = true;
let editControlsActive = [];
// const users = {
//   activeUser: '',
//   list: []
// };

// class Block {
//   constructor(name, number){
//     this.blockTitle = name;
//     this.blockId = `${name}-${number}`;
//     this.descriptions = [];
//   }

//   setDescription(text) {
//     this.descriptions.push(text)
//   }
// };

const initialDescriptions = [
    {
      name: 'Carlos',
      descriptionsInBlock: 9
    },
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