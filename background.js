async function checkEmails() {
    const { companyDomain, sampleContent } = await chrome.storage.local.get(["companyDomain", "sampleContent"]);
    if (!companyDomain || !sampleContent) return;
  
    fetch('https://mail.google.com/mail/u/0/feed/atom')
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const entries = xmlDoc.getElementsByTagName("entry");
        
        for (let entry of entries) {
          const title = entry.getElementsByTagName("title")[0].textContent;
          const author = entry.getElementsByTagName("author")[0].getElementsByTagName("email")[0].textContent;
          
          if (author.includes(companyDomain)) {
            // Placeholder for AI-based text similarity check
            if (title.toLowerCase().includes(sampleContent.toLowerCase())) {
              chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "New Relevant Email!",
                message: `From: ${author}\nSubject: ${title}`
              });
            }
          }
        }
      });
  }
  
  chrome.alarms.create("checkEmails", { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(checkEmails);
  