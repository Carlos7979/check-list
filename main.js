function  main() {
  const os = detectOS();
  const osElement = document.getElementById('os');
  osElement.innerHTML = os;

  if (!(os === 'Linux' || os === 'MacOS' || os === 'Windows')) {
    isTouchScreen = true;
  }

  const storedData = getData('schedules');
  if (storedData){
    setSchedulesToOptions(storedData);
    renderBlocks();
  } else {
    const buttonsContainer = document.getElementById('hide-header-buttons');
    buttonsContainer.removeAttribute('hidden');
    const headerButtons = document.getElementById('header-buttons');
    headerButtons.setAttribute('class', "header-buttons-welcome");
  }

  touchScreen(isTouchScreen);

    // temporal code for view inner width
  //   
  const innerWidth = document.getElementById('innerWidth');
  innerWidth.innerHTML = `${window.innerWidth} px`;
  window.onresize = reportWindowSize
  function reportWindowSize() {
      innerWidth.innerHTML = `${window.innerWidth} px`;
  }
  //
  // end of temporal code for view inner width

  newSchedule(document.getElementById('new-schedule'));
  newSchedule(document.getElementById('init-template'));
  newSchedule(document.getElementById('import-button-1'));
  newSchedule(document.getElementById('import-button-2'));
  newSchedule(document.getElementById('export-button'));
  exportSchedules(document.getElementById('export-all'));
  exportSchedules(document.getElementById('export-this'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  addSchedule(document.getElementById('add-schedule'));
  changeSchedule(document.getElementById('schedule-selector'));
  scheduleOptions(document.getElementById('options'));
  scheduleOptions(document.getElementById('options-2'));
  closeScheduleOptions(document.getElementById('overlay-options-container-4'));
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));
  create(document.getElementById('button-create'));
  // importSchedules(document.getElementById('import-label'));
  importListener(document.getElementById('file-input'));
  loadFiles(document.getElementById('load-file'));
  deleteAll(document.getElementById('delete-all-schedules'));
  toggleTouchScreen(document.getElementById('toggle-touchscreen'));
  passSeveralElementsInFunction(advancedOptions, document.getElementsByClassName('advanced-options'));
  passSeveralElementsInFunction(importExportButtons, document.getElementsByClassName('import-export'));
  passSeveralElementsInFunction(newBlock, document.getElementsByClassName('new-block'));
  passSeveralElementsInFunction(cleanBlocks, document.getElementsByClassName('clean-blocks'));
  passSeveralElementsInFunction(deleteSchedule, document.getElementsByClassName('delete-schedule'));
}
