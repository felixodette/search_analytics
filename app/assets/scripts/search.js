document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    let timer;
  
    searchBox.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch('/searches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search: {
              query: searchBox.value,
              ip_address: getIP(),
            },
          }),
        }).then(response => {
          if (response.ok) {
            getAnalytics();
          }
        });
      }, 300); // Debounce delay
    });
  
    function getAnalytics() {
      fetch('/searches')
        .then(response => response.json())
        .then(data => {
          const analyticsInfo = document.getElementById('analytics');
          analyticsInfo.innerHTML = JSON.stringify(data, null, 2);
        });
    }
  });

  function getIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP address', error);
            return null;
        });
  }
  