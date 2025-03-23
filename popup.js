document.getElementById('save').addEventListener('click', function() {
    const companyDomain = document.getElementById('companyDomain').value;
    const sampleContent = document.getElementById('sampleContent').value;
    chrome.storage.local.set({ companyDomain, sampleContent }, function() {
      alert('Settings Saved!');
    });
  });