function getXValue(){
    Xres = 0;
    Xres = getCheckedCheckBoxesSumm();
    return Xres;
}

function getCheckedCheckBoxesSumm() {
    var checkboxes = document.getElementsByClassName('xer');
    var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
    for (var index = 0; index < checkboxes.length; index++) {
       if (checkboxes[index].checked) {
          checkboxesChecked.push(parseFloat(checkboxes[index].value)); 
       }
    }
    let res = 0;
    checkboxesChecked.forEach(i => res += i);
    return res; // для использования в нужном месте
  }

function checkBoxChange(name) {
    var checkboxes = document.getElementsByClassName('xer');
    for (var index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked && checkboxes[index].name != name) {
            checkboxes[index].checked = false; 
        }
    } 
}

function Coordinates(xline, yline, Rline) {
    this.x = xline;
    this.y = yline;
    this.r = Rline;

    this.Validate = function (){
        console.log(this.x, this.y, this.r);
        xres = true;
        let re = /^((\s*(-?)\d+(\.\d+)?\s*)?)$/m;
        if (!re.test(this.y)) {console.error("неверное значение y (" + this.y + ")"); }
        let yres = /*re.test(this.x) &&*/ re.test(this.y);
        yres = yres & this.y <= 3 & this.y >= -3;
        document.getElementById("yComment").style.background = (yres) ? 'rgb(70, 70, 70)' : 'rgb(255, 0, 0)';
        

        return xres && yres;
    }
}

function get(x, y, z){
    fetch("./point.php?x=" + x +"&y="+y+"&R="+z).then(
       response => {
          return response.text();
       }
    ).then(
       text => {
            console.log(text);
            document.getElementById("storage").innerHTML = text;
            let s = (text.charAt(text.length- 34).toString())
            console.log(s);
            if (s == null || s==" "){s = 0;}
            document.getElementById('resImg').setAttribute("src", "./source/img/areas_"+ s +".png")
            document.getElementById('resText').innerHTML = ("ваша точка " + ((s == 0) ? "не" : "") + " попала в заданную облать");
       }
    );
 }

function checkPoint(){
    console.log("comilation...")
    let inputs = new Array(

        getXValue(), 
        document.forms["requestForm"]["y"].value,
        document.forms["requestForm"]["R"].value
        );
        
    console.log(inputs);
    if (inputs[1]==""){document.getElementById("yComment").style.background = 'rgb(255, 0, 0)'; return false;}
    let coords = new Coordinates( inputs[0], inputs[1], inputs[2]);
    isCorrect = coords.Validate();
    if (!isCorrect){ return false;} // тут можно подробно указать error

    res = get(inputs[0], inputs[1], inputs[2]);
    if (res) console.log("success!");
    
}

