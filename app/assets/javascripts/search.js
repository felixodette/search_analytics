document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('search-box');
  let timer;
  let lastQuery = '';
  let searchInProgress = false;

  searchBox.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
          const query = searchBox.value.trim();
          if (query && query !== lastQuery) {
              if (searchInProgress) {
                  // If a search is in progress, cancel it and update the query
                  clearTimeout(timer);
              }
              searchInProgress = true;
              lastQuery = query;

              fetch('/searches', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      search: {
                          query: query,
                          ip_address: getIP(),
                      },
                  }),
              }).then(response => {
                  searchInProgress = false;
                  if (response.ok) {
                      getAnalytics();
                  }
              }).catch(() => {
                  searchInProgress = false;
              });
          }
      }, 500); // Adjust debounce delay as needed
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
