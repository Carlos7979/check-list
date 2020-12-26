function  main() {
  let blocksNumber;
  let descriptionsNumber;
  let allowInitialData = false;

  let dataSet;
  
  const storagedData = getData('agenda');
    if(storagedData){
      allowInitialData = true;
    }
  blockConstructor(blocksNumber = 5, allowInitialData, dataSet, descriptionsNumber = 12);
}