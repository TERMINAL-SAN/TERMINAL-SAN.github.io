//アスタリスクは10、シャープは11として扱うゾ〜

//グローバル変数
var playCount = 0;

function ochiru(){
    
    var cur_Number;//入力されていた番号
    cur_Number = document.getElementById("pass").innerHTML;
    
    if(cur_Number == "114514"){//正解なら
        //初回([playCount=0])以外だったら音声ファイルを巻き戻す
        if(playCount > 0){
            document.getElementById("sound-file").currentTime = 0;
        }
        
        //[ID:sound-file]の音声ファイルを再生[play()]する
        document.getElementById("sound-file").play();
        
        //初回再生が終わった判定用に[playCount]の値を0から1に変更する
        playCount = 1;
    setTimeout('move();',3000);
    }else{//はずれなら
        alert("また君か壊れるなぁ");
    }

}

function move(){
    window.location.href = "honhe/";
}

function play(insert_number){
    
    if(insert_number == 10){insert_number = "*"};
    if(insert_number == 11){insert_number = "#"};
    
    var cur_Number;//既に入力されていた番号
    cur_Number = document.getElementById("pass").innerHTML;
    document.getElementById("pass").innerHTML = cur_Number + insert_number;

/*
    //初回([playCount=0])以外だったら音声ファイルを巻き戻す
    if(playCount > 0){
        document.getElementById("sound-file").currentTime = 0;
    }
    //[ID:sound-file]の音声ファイルを再生[play()]する
    document.getElementById("sound-file").play();
    //初回再生が終わった判定用に[playCount]の値を0から1に変更する
    playCount = 1;
 */
    
    
}


function reset(){
    document.getElementById("pass").innerHTML = "";
}

