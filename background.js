// 클릭 이벤트 리스너
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get("isEnabled", (res) => {
        let isEnabled = !res.isEnabled;
        let text = isEnabled ? "ON" : "OFF";

        chrome.action.setBadgeText({ text: text })
        chrome.storage.local.set({ "isEnabled": isEnabled });
    });
});

// 키보드 이벤트 리스너
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" triggered`);
});

// 새로고침 이벤트 리스너
chrome.tabs.onActivated.addListener(() => {
    chrome.storage.local.get("isEnabled", (res) => {
        let isEnabled = res.isEnabled;
        let text = isEnabled ? "ON" : "OFF";

        chrome.action.setBadgeText({ text: text })
        chrome.storage.local.set({ "isEnabled": isEnabled });
    });
});

// 크롬 익스텐션 처음 설치했을 때
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "isEnabled": true });
});