function  main() {
  
  const storedData = getData('schedules');
    if (storedData){
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
  newSchedule(document.getElementById('export-button'));
  exportSchedules(document.getElementById('export-all'));
  exportSchedules(document.getElementById('export-this'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  addSchedule(document.getElementById('add-schedule'));
  changeSchedule(document.getElementById('schedule-selector'));
  scheduleOptions(document.getElementById('options'));
  scheduleOptions(document.getElementById('options-2'));
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));
  create(document.getElementById('button-create'));
  // importSchedules(document.getElementById('import-label'));
  importListener(document.getElementById('file-input'));
  loadFiles(document.getElementById('load-file'));
  deleteAll(document.getElementById('delete-all-schedules'));
  advancedOptions(document.getElementById('advanced-options'));
  advancedOptions(document.getElementById('advanced-options-2'));
  importExportButtons(document.getElementById('import-export'));
  importExportButtons(document.getElementById('import-export-2'));
  newBlock(document.getElementById('new-block'));
  newBlock(document.getElementById('new-block-2'));
  cleanBlocks(document.getElementById('clean-blocks'));
  cleanBlocks(document.getElementById('clean-blocks-2'));
  deleteSchedule(document.getElementById('delete-schedule'));
  deleteSchedule(document.getElementById('delete-schedule-2'));
}
