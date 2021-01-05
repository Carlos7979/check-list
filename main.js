function  main() {
  
  storagedData = getData('schedules');
    if(storagedData){
      allowInitialData = true;
      setSchedulesToOptions(storagedData);
    } else {
      isLocalStorageEmpty = false;
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
}