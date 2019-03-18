console.log("client javascript initiated")
const inputText = document.getElementById("input-text")
const submitButton = document.getElementById("submit-button")

const getWindowSize = () => {
    const doc = document,
        w = window;

    const docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;

    const width = docEl.clientWidth;
    const height = docEl.clientHeight;

    // mobile zoomed in?
    if (w.innerWidth && width > w.innerWidth) {
        width = w.innerWidth;
        height = w.innerHeight;
    }

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
        fetch(`http://localhost:3500/weather?address=${inputText.value}&w=${winSize.width}&h=${winSize.height}&orientation=${orientation}`).then((response) => {
            response.json().then((data) => {
                console.log(data)
            })
        })

    } else {
        console.log("That didn't work!!!")
    }


})