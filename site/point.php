<?php
    function updateStorage($x, $y, $R, $succeed, $timing){
        $file = file_get_contents('data.json');  // Открыть файл data.json
        $taskList = json_decode($file,TRUE);        // Декодировать в массив 
        unset($file);   
        $newElement = array($x, $y, $R, $succeed , $timing);                  // Очистить переменную $file
        $taskList[] = array(  (($taskList==null)?1:(count($taskList)+1)) =>$newElement);        // Представить новую переменную как элемент массива, в формате 'ключ'=>'имя переменной'
        file_put_contents('data.json',json_encode($taskList));  // Перекодировать в формат и записать в файл.
        unset($taskList);  // update finished

        $file = file_get_contents('data.json');  // Открыть файл data.json
        

        $jsonIterator = new RecursiveIteratorIterator(
        new RecursiveArrayIterator(json_decode($file, TRUE)),
        RecursiveIteratorIterator::SELF_FIRST);
        $i = 0;
        foreach ($jsonIterator as $key => $val) {
            if ($i%7==0){echo "<tr>";}
            if(is_array($val)) {
            } else {
                echo "<th width=100px> $val</th>";
            }
            if ($i%7==6){echo "</tr>";}
            $i++;
        }
    }

    function isInSquare($X, $Y, $radius){
        if ($X >= 0 && $X <= $radius){
            return ($Y >= 0 && $Y <= $radius);
        }
        else{
            if ($Y >= 0){
                return ($X**2 + $Y**2 <= $radius**2);
            }
            else{
                return ($Y >= -0.5 * ($X + $radius));
            }
        }
    }


    function main(){
        global $inSquareFlag;
        $start = microtime(true);
        

        $x = $_GET['x']; 
        $y = $_GET['y'];
        $R = $_GET['R'];
        $inSquareFlag = isInSquare($x, $y, $R);
        $timing = round((microtime(true) - $start)*1000000);
        updateStorage($x, $y, $R, $inSquareFlag, $timing);
    }
    
    
    main();
?>
