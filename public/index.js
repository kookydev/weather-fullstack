console.log("client javascript initiated")
const inputText = document.getElementById("input-text")
const submitButton = document.getElementById("submit-button")
let bodyStyle = document.body.style



const getWindowSize = () => {
    const doc = document,
        w = window;

    const docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;

    const width = docEl.clientWidth;
    const height = docEl.clientHeight;



    return {
        width: width,
        height: height
    };
}


submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    const winSize = getWindowSize()
    const orientation = winSize.height > winSize.width ? "portrait" : "landscape"
    if (inputText.value) {
        fetch(`/weather?address=${inputText.value}&w=${winSize.width}&h=${winSize.height}&orientation=${orientation}`).then((response) => {
            response.json().then((data) => {
                console.log(data)
                bodyStyle.backgroundImage = `url("${data.img.imgURL}")`
            })
        })

    } else {
        console.log("That didn't work!!!")
    }


})