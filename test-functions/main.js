function main() {
    var data = { x: 42, s: "hello, world", d: new Date() },
    fileName = "my-schedule.json";

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var div1 = document.createElement("div");
    document.body.appendChild(div1);
    div1.innerHTML = 'download';

    var label = document.createElement("label");
    label.setAttribute('for', 'fileinput');
    label.setAttribute('class', 'label');
    document.body.appendChild(label);
    label.innerHTML = 'open';
    
    
    div1.addEventListener('click', () => {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        console.log(1);
        console.log(window.URL);
        window.URL.revokeObjectURL(url);
    });

    const button = document.getElementById('btnLoad');
    button.addEventListener('click', () => {
        loadFile();
    })

    function loadFile() {
        var file, fr;
    
        if (typeof window.FileReader !== 'function') {
          alert("The file API isn't supported on this browser yet.");
          return;
        }
    
        const input = document.getElementById('fileinput');
        if (!input) {
          alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
          alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
          alert("Please select a file before clicking 'Load'");
        }
        else {
          file = input.files[0];
          fr = new FileReader();
          fr.onload = receivedText;
          fr.readAsText(file);
          console.log(input.files);
          input.value = null;
          console.log(input.files);
        }
    
        function receivedText(e) {
          let lines = e.target.result;
          var newArr = JSON.parse(lines);
          // console.log(newArr);
        }
      }
}