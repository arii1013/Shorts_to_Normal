// 클릭 이벤트 리스너
// chrome.action.onClicked.addListener((tab) => {
//     chrome.storage.local.get("isEnabled", (res) => {
//         let isEnabled = !res.isEnabled;
//         let text = isEnabled ? "ON" : "OFF";

//         chrome.action.setBadgeText({ text: text })
//         chrome.storage.local.set({ "isEnabled": isEnabled });
//     });
// });

// 리다이렉트
function redirect(url) {
    document.location.href = url;
}

// 키보드 이벤트 리스너
chrome.commands.onCommand.addListener((command) => {
    console.log(`${command}`);
    if (command === "toggle") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            let url = tabs[0].url;
            const shortsurl = "https://www.youtube.com/shorts/";
            const normalurl = "https://www.youtube.com/watch?v=";
            
            if (url.startsWith(shortsurl)) {
                url = url.replace(shortsurl, normalurl);
            } else if (url.startsWith(normalurl)) {
                url = url.replace(normalurl, shortsurl);
            }
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: redirect,
                args: [url]
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