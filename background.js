// 클릭 이벤트 리스너
// chrome.action.onClicked.addListener((tab) => {
//     chrome.storage.local.get("isEnabled", (res) => {
//         let isEnabled = !res.isEnabled;
//         let text = isEnabled ? "ON" : "OFF";

//         chrome.action.setBadgeText({ text: text })
//         chrome.storage.local.set({ "isEnabled": isEnabled });
//     });
// });

// URL 상수
const shortsurl = "https://www.youtube.com/shorts/";
const normalurl = "https://www.youtube.com/watch?v=";

// 리다이렉트
function reDirect(url) {
    document.location.href = url;
}

// 다음 컨텐츠
function go(p) {
    document.querySelectorAll("ytd-button-renderer.ytd-shorts  button#button.yt-icon-button")[p].click();
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
            }
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: reDirect,
                args: [url]
            })
        });
    }
    // ALT+A or ALT+S
    else {
        let p;
        if (command === "next") p = 1;
        else if (command === "prev") p = 0;

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: go,
                args: [p]
            })
        });
    }
});


// 새로고침 이벤트 리스너
// chrome.tabs.onActivated.addListener(() => {
//     chrome.storage.local.get("isEnabled", (res) => {
//         let isEnabled = res.isEnabled;
//         let text = isEnabled ? "ON" : "OFF";

//         chrome.action.setBadgeText({ text: text })
//         chrome.storage.local.set({ "isEnabled": isEnabled });
//     });
// });

// 크롬 익스텐션 처음 설치했을 때
// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({ "isEnabled": true });
// });