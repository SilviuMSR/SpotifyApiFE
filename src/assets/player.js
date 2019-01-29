window.onload = function(){
    var audio_box = q('.audio_box'),
        audio_controls = q('input', audio_box),
        audio_node = q('audio', audio_box),
        play_audio = q('.audio_btn', audio_box),
        current_time = q('.current_time', audio_box),
        total_time = q('.total_time', audio_box),
        audio_duration = Math.trunc(audio_node.duration);
        played = new Date(null),
        rest = new Date(null),
        toTime = function(time_val) {
            if (audio_duration > 599) {
                return time_val.toISOString().substr(14, 5)
            } else{
                console.log(rest, time_val)

                return time_val.toISOString().substr(15, 4)
            }
        },
        updateTime = function() {
            played.setSeconds(audio_node.currentTime);
            current_time.innerHTML = toTime(played);
        }
    audio_controls.max = audio_duration;
    rest.setSeconds(audio_duration);
    time_rest = toTime(rest);
    total_time.innerHTML = time_rest;
    updateTime();
    play_audio.onclick = function() {
        if (audio_box.className.indexOf('active_state') === -1) {
            audio_box.className += ' active_state'
            audio_node.play();
        } else {
            audio_node.pause();
            audio_box.className = audio_box.className.replace(' active_state', '');
        }
    }
    audio_controls.onchange = function() {
        audio_node.currentTime = audio_controls.value;
        updateTime();
    }
    audio_node.ontimeupdate = function() {
        audio_controls.value = audio_node.currentTime;
        updateTime();
    }

}