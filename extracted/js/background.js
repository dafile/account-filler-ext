chrome.action.onClicked.addListener(function () {
    //chrome.tabs.executeScript(null, { file: "JavaScript3.js" });
    //chrome.tabs.insertCSS(null, { file: "css.css" });

});
chrome.runtime.onInstalled.addListener(function (data) {
    if (data.reason == "install") {
        chrome.tabs.create({
            url: "/options.html"
        })
    }
})

 