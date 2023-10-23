function submitFunction(){
    let x = document.getElementById("form-input").value;
    x = x.toLowerCase();

    if (x == "freddy fazbear"){
        let vid = document.getElementById("arf-arf-arf-arf")
        vid.style.zIndex = 1;
        vid.style.width = "1080px";
        vid.play();
        vid.requestFullscreen();
    }
    else if (x == "time"){
        let textTime = document.getElementById("time")
        textTime.style.zIndex = 1;
        setInterval(setTime, 1000);
    }

}

//function to set time
function setTime() {
    currentDate = new Date();
    let textTime = document.getElementById("time")

    textTime.innerText = (currentDate.getHours())+(":")+(currentDate.getMinutes())+":"+(currentDate.getSeconds());
}