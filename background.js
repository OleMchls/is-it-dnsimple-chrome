chrome.history.onVisited.addListener(function(result) {
    chrome.tabs.query({currentWindow: true, active : true}, function(tab){
      var domain = new URL(result.url).host
      var tabId = tab[0].id

      fetch("https://isitdnsimple.com/" + domain, {
        headers: {"Accept": "application/json"}
      })
      .then(response => response.json())
      .then(result => result.result)
      .then(function(isDNSimple) {
        if (isDNSimple) {
          chrome.pageAction.show(tabId)
        } else {
          chrome.pageAction.hide(tabId)
        }
      })
  })
})
