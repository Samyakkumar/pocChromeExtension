document.addEventListener("DOMContentLoaded", (event) => {
    
    var enableButton = document.getElementById("enableExtensionButton");
    enableButton.addEventListener("mouseup", (event) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from:"helloExtension", subject: "enableExtension"},
                (res) => {
                    console.log(res);
                }
            )
        })
    })

    var disableButton = document.getElementById("disableExtensionButton");

    disableButton.addEventListener("mouseup", (event) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from:"helloExtension", subject: "disableExtension"},
                (res) => {
                    console.log(res);
                }
            )
        })
    })

    var saveSelectedButton = document.getElementById("saveSelected");

    saveSelectedButton.addEventListener("mouseup", (event) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from:"helloExtension", subject: "saveSelected"},
                (res) => {
                    console.log(res);
                }
            )
        })
    })
})
