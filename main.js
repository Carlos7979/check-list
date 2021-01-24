function  main() {
  
  const storedData = getData('schedules');
    if(storedData){
      setSchedulesToOptions(storedData);
      renderBlocks();
    } else {
      const buttonsContainer = document.getElementById('hide-header-buttons');
      buttonsContainer.removeAttribute('hidden');
    }

  newSchedule(document.getElementById('new-schedule'));
  newSchedule(document.getElementById('init-template'));
  newSchedule(document.getElementById('import-button-1'));
  newSchedule(document.getElementById('import-button-2'));
  exportSchedules(document.getElementById('export-button'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  addSchedule(document.getElementById('add-schedule'));
  changeSchedule(document.getElementById('schedule-selector'));
  scheduleOptions(document.getElementById('options'));
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));
  create(document.getElementById('button-create'));
  // importSchedules(document.getElementById('import-label'));
  importListener(document.getElementById('file-input'));
  loadFiles(document.getElementById('load-file'));
  deleteAll(document.getElementById('delete-all-schedules'));
  importExportButtons(document.getElementById('import-export'));
  newBlock(document.getElementById('new-block'));
  cleanBlocks(document.getElementById('clean-blocks'));
  deleteSchedule(document.getElementById('delete-schedule'));
}