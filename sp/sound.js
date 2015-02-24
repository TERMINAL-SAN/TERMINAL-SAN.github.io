//アスタリスクは10、シャープは11として扱うゾ〜

//グローバル変数
var playCount = 0;



function play(insert_number){
    
    if(insert_number == 10){insert_number = "*"};
    if(insert_number == 11){insert_number = "#"};
    
    var cur_Number;//既に入力されていた番号
    cur_Number = document.getElementById("password").value;
    document.getElementById("password").value = cur_Number + insert_number;

    
}


function reset(){
    document.getElementById("password").value = null;
}

