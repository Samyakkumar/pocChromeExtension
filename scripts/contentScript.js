var previousElement = null;
var currElement = null;
var elementSelected = null;
var enableExtension = false;

var HOVER_CSS_MOUSE_VISITED_CLASS_NAME = "hover-css-mousevisited";
var MOUSE_CLICKED_CLASS_NAME = "mouse-clicked-by-extension";



document.addEventListener('mousemove', (event) => {
    if (enableExtension) {
        previousElement = currElement;
        currElement = event.target;

        if (previousElement != null) {
            previousElement.classList.remove(HOVER_CSS_MOUSE_VISITED_CLASS_NAME);
        }

        if (currElement != null) {
            currElement.classList.add(HOVER_CSS_MOUSE_VISITED_CLASS_NAME);
        }
    }
})

document.addEventListener("mouseup", (event) => {
    if (enableExtension) {
        if (elementSelected != null && elementSelected == event.target) {
            elementSelected.classList.remove(MOUSE_CLICKED_CLASS_NAME);
        } else {
            elementSelected = event.target;
            elementSelected.classList.add(MOUSE_CLICKED_CLASS_NAME);
        }
    }
})

chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (request.from == "helloExtension" && request.subject.includes("Extension")) {
        enableExtension = request.subject == "enableExtension";
        response({status: enableExtension});
    } else if (request.from == "helloExtension" && request.subject.includes("save")) {
        if (elementSelected != null) {
            enableExtension = false;
            elementSelected.classList.remove(MOUSE_CLICKED_CLASS_NAME);
            elementSelected.classList.remove(HOVER_CSS_MOUSE_VISITED_CLASS_NAME);
            domtoimage.toJpeg(elementSelected, { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
                elementSelected.classList.add(MOUSE_CLICKED_CLASS_NAME);
                enableExtension = true;
            });
            response({status: true});
        }
    }
});