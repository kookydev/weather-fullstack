console.log("client javascript initiated");
const inputText = document.getElementById("input-text");
const submitButton = document.getElementById("submit-button");
let bodyStyle = document.body.style;
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const logo = document.getElementById("logo");
const result = document.getElementById("result");
const placename = document.getElementById("placename");
const summary = document.getElementById("summary");
const author = document.getElementById("author-name");

const getWindowSize = () => {
    const doc = document,
        w = window;

    const docEl =
        doc.compatMode && doc.compatMode === "CSS1Compat" ?
        doc.documentElement :
        doc.body;

    const width = docEl.clientWidth;
    const height = docEl.clientHeight;

    return {
        width: width,
        height: height
    };
};

let returnedData = {};
let picPreload = submitButton.addEventListener("click", e => {
    e.preventDefault();
    const winSize = getWindowSize();
    const orientation = winSize.height > winSize.width ? "portrait" : "landscape";
    if (inputText.value) {
        loading.classList = "loading show";
        search.classList = "search";

        fetch(
            `/weather?address=${inputText.value}&w=${winSize.width}&h=${
        winSize.height
      }&orientation=${orientation}`
        ).then(response => {
            response.json().then(data => {
                console.log(data);

                //preload the background image before displaying
                var url = data.img.imgURL;
                var img = new Image();
                img.src = url;
                img.onload = function () {
                    bodyStyle.backgroundImage = `url("${data.img.imgURL}")`;
                    loading.classList = "loading";
                    search.classList = "search show";
                    result.classList = "result show";
                    placename.innerText = data.location;
                    summary.innerText = data.forecast.summary;
                    author.innerText = data.img.authorName
                    author.href = data.img.authorURL
                };
            });
        });
    } else {
        console.log("That didn't work!!!");
    }
});