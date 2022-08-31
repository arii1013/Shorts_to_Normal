function test() {
    var bodyText = window.location.toString().replace("/shorts/", "/watch?v=");
    document.location.href = bodyText;
}

chrome.tabs.query({ active: true }, function (tabs) {
    let tab = tabs[0];
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: test,
        },
        (injectionResults) => displaySearch(injectionResults[0].result)
    );
});