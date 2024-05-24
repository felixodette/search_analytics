document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('search-box');
  let timer;

  searchBox.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
          const query = searchBox.value.trim(); // Trim whitespace from the input
          if  (query.length > 4) { // Validate input
              fetchSearchResults(query);
          }
      }, 500);
  });

  function fetchSearchResults(query) {
      const ipAddressPromise = getIP().catch(error => {
          console.error('Error fetching IP address', error);
          return null;
      });

      ipAddressPromise.then(ipAddress => {
          if (ipAddress !== null) {
              fetch('/searches', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      search: {
                          query: query,
                          ip_address: ipAddress,
                      },
                  }),
              }).then(response => {
                  if (response.ok) {
                      getAnalytics();
                  }
              }).catch(error => {
                  console.error('Error fetching search results', error);
              });
          }
      });
  }

  function getAnalytics() {
      fetch('/searches')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch analytics data');
              }
              return response.json();
          })
          .then(data => {
              const analyticsInfo = document.getElementById('analytics');
              analyticsInfo.textContent = JSON.stringify(data, null, 2); // Use textContent instead of innerHTML
          })
          .catch(error => {
              console.error('Error fetching analytics data', error);
          });
  }

  function getIP() {
      return fetch('https://api.ipify.org?format=json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch IP address');
              }
              return response.json();
          })
          .then(data => data.ip)
          .catch(error => {
              console.error('Error fetching IP address', error);
              return null;
          });
  }
});
