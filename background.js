// Redirect URL (ALT+Q)
function reDirect() {
    // URL CONSTANT
    const SHORTSURL = "https://www.youtube.com/shorts/";
    const NORMALURL = "https://www.youtube.com/watch?v=";

    let url = document.location.href;

    if (url.startsWith(SHORTSURL)) url = url.replace(SHORTSURL, NORMALURL);
    else if (url.startsWith(NORMALURL)) url = url.replace(NORMALURL, SHORTSURL);

    document.location.href = url;
}

// Dislike & never Recommend the content youre seeing
function block() {
    // CSS Selectors
    const SHORTSURL = "https://www.youtube.com/shorts/";
    const CONTENTS = "ytd-reel-video-renderer.ytd-shorts div#player-container";
    const DISLIKES = "ytd-toggle-button-renderer#dislike-button tp-yt-paper-button#button.ytd-toggle-button-renderer";
    const DONTRECOMMPANEL = "ytd-reel-player-overlay-renderer div#actions div#menu ytd-menu-renderer yt-icon-button";
    const DONTRECOMM = "ytd-menu-service-item-renderer.ytd-menu-popup-renderer";
    const NEXTBTN = "ytd-button-renderer.ytd-shorts button#button.yt-icon-button";

    // get your current url and check whether its shorts url
    let uid = document.location.href;
    if (!uid.startsWith(SHORTSURL)) return;
    uid = uid.replace(SHORTSURL, "");

    // get the index of content
    const contents = document.querySelectorAll(CONTENTS);
    let index = 0;
    // the content whose index is 0 HAS NO ATTRIBUTE "style"
    for (let i=1; i<contents.length; i++) {
        let contents_uid = contents[i].getAttribute("style");
        contents_uid = contents_uid.match(/vi\/[-_\w]+/).toString().replace("vi/", "");
        if (contents_uid === uid) index = i;
    }

    // dislike the content
    const dislike = document.querySelectorAll(DISLIKES)[index];
    if (dislike) dislike.click();

    // never recommend the content
    let dontrecomm = document.querySelectorAll(DONTRECOMMPANEL)[index];
    if (dontrecomm) dontrecomm.click();
    dontrecomm = document.querySelectorAll(DONTRECOMM)[1];
    if (dontrecomm) dontrecomm.click();

    // get next contents
    const nextbtn = document.querySelectorAll(NEXTBTN)[1];
    if (nextbtn) nextbtn.click();
}

// Get next contents (ALT+A or ALT+S)
function go(p) {
    const btn = document.querySelectorAll("ytd-button-renderer.ytd-shorts button#button.yt-icon-button")[p];
    if (btn) btn.click();
}

// Keyboard Event Listener
chrome.commands.onCommand.addListener((command) => {
    // ALT+Q
    if (command === "toggle") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: reDirect
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