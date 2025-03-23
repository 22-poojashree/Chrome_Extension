chrome.runtime.onInstalled.addListener(() => {
    console.log("Gmail Inbox Tracker Extension Installed");
});

chrome.notifications.create(
    "email_notification", {
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Inbox Tracker",
        message: "Your extension is running!"
    }
);
