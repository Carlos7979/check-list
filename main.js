function  main() {
  let blocksNumber;
  let descriptionsNumber;
  let allowInitialData = false;

  let dataSet;
  
  const storagedData = getData('schedule');
    if(storagedData){
      allowInitialData = true;
      // console.log('hello');
    }

  newSchedule(document.getElementById('new-schedule'));
  newSchedule(document.getElementById('init-template'));
  editHeaderControlActiveDetector(document.getElementsByTagName('header')[0]);
  
  inputHeaderActiveDetector(document.getElementById('name'));
  inputHeaderActiveDetector(document.getElementById('blocks-number'));
  inputHeaderActiveDetector(document.getElementById('descriptions-number'));

  blockConstructor(blocksNumber = 5, allowInitialData, dataSet, descriptionsNumber = 12);
}