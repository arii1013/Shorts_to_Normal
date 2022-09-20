// URL 상수
const shortsurl = "https://www.youtube.com/shorts/";
const normalurl = "https://www.youtube.com/watch?v=";

// ALT+Q 리다이렉트
function reDirect(url) {
    document.location.href = url;
}

// 컨텐츠 index
let page = 0;
// ALT+W 컨텐츠 차단
function block() {
    const dislike = document.querySelectorAll("ytd-toggle-button-renderer#dislike-button")[page];
    if (dislike) dislike.click();

    const dontrecomm = document.querySelectorAll("ytd-menu-service-item-renderer.ytd-menu-popup-renderer")[1];
    if (dontrecomm) dontrecomm.click();
}

// ALT+A or ALT+S 다음 컨텐츠
function go(p) {
    const btn = document.querySelectorAll("ytd-button-renderer.ytd-shorts  button#button.yt-icon-button")[p];
    if (btn) btn.click();
}


// 키보드 이벤트 리스너
chrome.commands.onCommand.addListener((command) => {
    // ALT+Q
    if (command === "toggle") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            let url = tabs[0].url;
            
            if (url.startsWith(shortsurl)) {
                url = url.replace(shortsurl, normalurl);
            } else if (url.startsWith(normalurl)) {
                url = url.replace(normalurl, shortsurl);
                page = 0;
            }
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: reDirect,
                args: [url]
            })
        });
    }
    // ALT+W
    else if (command == "block") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: block
            })
        });
    }
    // ALT+A or ALT+S
    else {
        let p;
        if (command === "next") {
            p = 1;
            page += 1;
        } else if (command === "prev") {
            p = 0;
            page -= 1;
        }

        console.log(page);

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: go,
                args: [p]
            })
        });
    }
});