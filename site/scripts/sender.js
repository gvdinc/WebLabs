function Coordinates(xline, yline, Rline) {
    this.x = xline;
    this.y = yline;
    this.r = Rline;

    this.Validate = function (){
        let re = /^((\s*(-?)\d+(\.\d+)?\s*)?)$/m;
        if (!re.test(this.x)) {console.error("неверное значение x (" + this.x + ")"); }
        if (!re.test(this.y)) {console.error("неверное значение y (" + this.y + ")"); }
        if (!re.test(this.r)) {console.error("неверное значение R (" + this.r + ")"); }
        let res = re.test(this.x) && re.test(this.y) && re.test(this.r);
        document.getElementById("error").style.display = (res) ? 'none' : 'inline';
        return res;
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
       }
    );
 }

function checkPoint(){
    let inputs = new Array(
        document.forms["requestForm"]["x"].value, 
        document.forms["requestForm"]["y"].value,
        document.forms["requestForm"]["R"].value
        );
    for(i = 0; i < 3; i++){if (inputs[i]==""){alert("Заполните все поля!"); return false;}}
    let coords = new Coordinates( inputs[0], inputs[1], inputs[2]);
    isCorrect = coords.Validate();
    if (!isCorrect){alert("Невеное значение переменной!"); return false;} // тут можно подробно указать error

    res = get(inputs[0], inputs[1], inputs[2]);
    if (res) console.log("sucess!");
    
}

