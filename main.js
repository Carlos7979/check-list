function  main() {
  let blocksNumber;
  let descriptionsNumber;
  let allowInitialData = false;

  let dataSet;
  const storagedData = JSON.parse(localStorage.getItem('key'));
    if(storagedData){
      allowInitialData = true;
    }
  blockConstructor(blocksNumber = 5, allowInitialData = true, dataSet, descriptionsNumber = 12);
}