var recognition;
var nowRecognition = false;
var $finalSpan = document.querySelector('#final_span');
var $interimSpan = document.querySelector('#interim_span');

function start () {
    recognition = new webkitSpeechRecognition();
    recognition.lang = document.querySelector('#select2').value;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function (e) {
        var finalText = '';
        var interimText = '';
        for (var i = 0; i < e.results.length; i++) {
            if (e.results[i].isFinal) {
                finalText += e.results[i][0].transcript;
            } else {
                interimText += e.results[i][0].transcript;
            }
        }
        $interimSpan.textContent = interimText;
        $finalSpan.textContent = finalText;
    };
    recognition.start();
    nowRecognition = true;
};

function stop () {
    recognition.stop();
    nowRecognition = false;
    console.log(document.getElementById("interim_span").innerHTML);
    if(document.getElementById("interim_span").innerHTML == "あくしろよ"){
        window.location.href = "../honhe";
    }
}

document.querySelector('#btn2').onclick = function () {
    
    // unsupported.
    if (!'webkitSpeechRecognition' in window) {
        alert('Web Speech API には未対応です.');
        return;
    }
    
    if (nowRecognition) {
        stop();
        this.value = 'ｸﾙﾙｧ!免許持ってんのか!!';
        this.className = '';
    } else {
        start();
        this.value = 'STOP(迫真)';
        this.className = 'select';
    }
}