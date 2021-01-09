function  main() {
  
  const storagedData = getData('schedules');
    if(storagedData){
      setSchedulesToOptions(storagedData);
      renderBlocks();
    } else {
      const buttonsContainer = document.getElementById('hide-header-buttons');
      buttonsContainer.removeAttribute('hidden');
    }

  newSchedule(document.getElementById('new-schedule'));
  newSchedule(document.getElementById('init-template'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  addSchedule(document.getElementById('add-schedule'));
  changeSchedule(document.getElementById('schedule-selector'));
  scheduleOptions(document.getElementById('options'));
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));
  create(document.getElementById('button-create'));
  deleteAll(document.getElementById('delete-all-schedules'));
  newBlock(document.getElementById('new-block'));
  cleanBlocks(document.getElementById('clean-blocks'));
  deleteBlock(document.getElementById('delete-schedule'));
}