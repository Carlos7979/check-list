function  main() {
  const list01 = document.getElementById('morning');
  const list02 = document.getElementById('activities');
  const list03 = document.getElementById('valentina');
  const list04 = document.getElementById('final');

  list01.addEventListener('click',  (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
      const buttonID = parseFloat(target.getAttribute('id'));
      const checkButton = document.getElementById(buttonID);
      checkButton.innerText !== '' ? checkButton.innerText = '' : checkButton.innerText = '✓';
    }
  });

  list02.addEventListener('click',  (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
      const buttonID = parseFloat(target.getAttribute('id'));
      const checkButton = document.getElementById(buttonID);
      checkButton.innerText !== '' ? checkButton.innerText = '' : checkButton.innerText = '✓';
    }
  });

  list03.addEventListener('click',  (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
      const buttonID = parseFloat(target.getAttribute('id'));
      const checkButton = document.getElementById(buttonID);
      checkButton.innerText !== '' ? checkButton.innerText = '' : checkButton.innerText = '✓';
    }
  });

  list04.addEventListener('click',  (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
      const buttonID = parseFloat(target.getAttribute('id'));
      const checkButton = document.getElementById(buttonID);
      checkButton.innerText !== '' ? checkButton.innerText = '' : checkButton.innerText = '✓';
    }
  });
}