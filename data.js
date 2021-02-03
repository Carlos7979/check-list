let allowInitialData = false;
let editControlsActive = []; // allow identify descriptions id controls
let blockOptionsContainerActive = []; // allow identify what type of option container is active and its identifier block number
let headerControlsActive = []; // not used yet
// let descriptionNumberVisibility = [];

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