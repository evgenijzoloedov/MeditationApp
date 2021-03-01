const app=()=>{
    const song=document.querySelector('.song')
    const play=document.querySelector('.play')
    const outline=document.querySelector('.movien-outline circle')
    const video=document.querySelector('.vid_container video')
    //Sounds
    const sounds=document.querySelectorAll('.sound_tracker button')
    //Time
    const time=document.querySelector('.time_display')
    const timeSelect=document.querySelectorAll('.time_select button')
    //GEt the Length of the outline
    const outlineLength=outline.getTotalLength()
    console.log(timeSelect);
    //Duration
    let fakeDuration=600;
    outline.style.strokeDasharray=outlineLength//Делит окружность на заведенную длину.
    outline.style.strokeDashoffset=outlineLength
    //Pick different sounds
    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound')
            video.src=this.getAttribute('data-video')
            checkPlaying(song)
        })
    })
    //Sounds
    play.addEventListener('click',()=>{
        checkPlaying(song)
    })
    //Select sound
    timeSelect.forEach(el=>{
        el.addEventListener('click',function(){
            fakeDuration=this.getAttribute('data-time')
            time.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
        })
    })
    console.log(song);
    const checkPlaying= song=>{
        if (song.paused){
            song.play()
            video.play()
            play.src="./svg/pause.svg"
        }else{
            song.pause()
            video.pause()
            play.src="./svg/play.svg"
        }
    }

    song.ontimeupdate= ()=>{
        let currentTime=song.currentTime
        let elapsed=fakeDuration-currentTime
        let seconds=Math.floor(elapsed % 60)
        let minutes=Math.floor(elapsed / 60)

        //Animate the circle
        let progress = outlineLength -(currentTime/fakeDuration) *outlineLength
        outline.style.strokeDashoffset=progress
        //Animate the text
        time.textContent=`${minutes}:${seconds}`


        if (currentTime>=fakeDuration){
            song.pause()
            song.currentTime=0
            video.pause()
            play.src="./svg/play.svg"
        }
    }
}
app()
