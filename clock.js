let start = document.getElementById("start")
let day = document.getElementById("day")
let hour = document.getElementById("hour")
let minute = document.getElementById("minute")
let second = document.getElementById("second")
let pause = document.getElementById("pause")
let reset = document.getElementById("reset")
let audio = new Audio("battle-march-action-loop-6935.mp3")
start.addEventListener("click", () => {
    try {
        let input = document.getElementById("input").value
        let option = document.querySelector(".opt").value.toLowerCase()

        if (isNaN(input)) {
            alert("Countdown must be a number!")
            return;
        }
        if(option == "day" && input > 365){
            alert("Days can't exceed 365")
            return 
        }

        if (option == "hour" && input > 24) {
            alert("Hours can't exceed 24, use day countdown!")
            return;
        }

        if (option == "minute" && input > 60) {
            alert("Minute can't exceed 60, use hour countdown!")
            return
        }

        if (option == "second" && input > 60) {
            alert("Seconds can't exceed 60, use minute countdown!")
            return;
        }

        if (option == "day") {
            day.value = input - 1
            hour.value = 24
            minute.value = 60
            second.value = 60
        }

        if (option == "hour") {
            day.value = 0
            hour.value = input - 1
            minute.value = 60
            second.value = 60
        }

        if (option == "minute") {
            day.value = 0
            hour.value = 0
            minute.value = input - 1
            second.value = 60
        }

        if (option == "second") {
            day.value = 0
            hour.value = 0
            minute.value = 0
            second.value = input
        }

        countdown()
    } catch (error) {
        alert("Refresh and try again")
        console.error("An error occurred:", error);
    }
})

let interval;
let clicked = true

pause.addEventListener("click",() => {
    if(clicked){
        clearInterval(interval)
        pause.innerText = "resume"
    }else{
        countdown()
        pause.innerText = "pause"
    }
    clicked = !clicked
})

reset.addEventListener("click",() => {
    window.location.reload()
})

const countdown = () => {
    interval = setInterval(() => {
        if(minute.value == 0 && second.value == 0){
            second.value = 1
            clearInterval(interval)
            audio.play()
            alert("COUNTDOWN COMPLETE")
        }
        if(minute.value > 0){
            if(second.value == 0){
                minute.value -= 1
                second.value = 60
            }
        }
        if(hour.value > 0){
            if(minute.value == 0){
                hour.value -= 1
                minute.value = 60
            }
        }
        if(day.value > 0){
            if(hour.value == 0){
                day.value = -1
                hour.value = 24
            }
        }        
        second.value -= 1        
    },1000)
}
