function  main() {
  
  const storagedData = getData('schedule');
    if(storagedData){
      allowInitialData = true;
      // console.log('hello');
    }

  newSchedule(document.getElementById('new-schedule'));
  newSchedule(document.getElementById('init-template'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  addSchedule(document.getElementById('add-schedule'));
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));
  create(document.getElementById('button-create'));
}