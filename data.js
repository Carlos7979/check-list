let allowInitialData = false;
let editControlsActive = [];
// editControlsActive allow identify descriptions id controls
let blockOptionsContainerActive = [];
// blockOptionsContainerActive allow identify what type of option container is active and its identifier block number
let headerControlsActive = [];
// headerControlsActive not used yet
// let descriptionNumberVisibility = [];
let blockToCopy = [];
let isTouchScreen = false;

const initialDescriptions = [
    {
      name: '',
      descriptionsInBlock: 9
    },
    [ 'Inicio del día',
      ['', 'Baño'],
     ['', 'Desayuno'],
     ['', 'Noticias'],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', '' ]],
    [ 'Actividades',
     ['', 'Trabajo'],
     ['', 'Programación'],
     ['', 'Compras'],
     ['', 'Reuniones'],
     ['', 'Llamadas'],
     ['', '' ]],
    [ 'Tarde',
     ['', 'Deporte'],
     ['', 'Matemáticas'],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', '' ]],
    [ 'Final del día',
     ['', 'Lectura'],
     ['', 'Inglés'],
     ['', 'Guitarra'],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', ''],
     ['', '' ]]
  ];
  