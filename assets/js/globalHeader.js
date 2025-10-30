console.log('globalHeader.js loaded');

document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOMContentLoaded triggered');

    try {
        const headerPath = getAssetPath('globalHeader.html');
        const response = await fetch(headerPath);
        console.log('Fetching globalHeader.html – Status:', response.status);

        if (!response.ok) throw new Error('Header file not found');

        const html = await response.text();
        console.log('Header HTML fetched successfully');

        const container = document.getElementById('globalHeader');
        if (container) {
            container.innerHTML = html;
            console.log('Header injected into #globalHeader');


              // Dynamically add Logout button if not present
              const navBar = container.querySelector('.t-NavigationBar'); // or correct header UL class
              if (navBar && !navBar.querySelector('#logout')) {
                const logoutItem = document.createElement('li');
                logoutItem.className = 't-NavigationBar-item';
                logoutItem.id = 'logout';
                logoutItem.innerHTML = `
                  <button class="t-Button t-Button--icon t-Button--header t-Button--navBar" type="button">
                    <span class="t-Icon fa fa-user"></span>
                    <span class="t-Button-label">Log Out</span>
                    <span class="t-Button-badge"></span>
                    <span class="a-Icon icon-down-arrow" aria-hidden="true"></span>
                  </button>
                `;
                navBar.appendChild(logoutItem);
                console.log('Logout button dynamically added to header');
              }

              // Attach logout click handler (same logic you already have)
              const logoutButton = container.querySelector('#logout');
              if (logoutButton) {
                logoutButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  console.log('Logout clicked from globalHeader');
                  sessionStorage.clear();
                  window.location.replace("../index.html"); // Prevent back navigation
                });
              }



            // Set username
            const username = sessionStorage.getItem('userName') || 'User';
            const usernameElement = document.getElementById('dynamicUsername');
            if (usernameElement) {
                usernameElement.textContent = username;
                console.log('Username set:', username);
            }

            // --- Sign Out button ---
            // const signOutBtn = document.getElementById('signOutBtn');
            // if (signOutBtn) {
            //     signOutBtn.addEventListener('click', function (e) {
            //         e.preventDefault();
            //         console.log('Sign out clicked');
            //         sessionStorage.clear();

            //         // Redirect to environment-based index.html
            //         const basePath = getEnvBasePath();
            //         const folder = getCurrentFolder();

            //         // If inside /indian_medicine/amo/... → redirect to /indian_medicine/amo/index.html
            //         // If directly inside /indian_medicine/... → redirect to /indian_medicine/index.html
            //         const targetUrl = `${basePath}/index.html`;

            //         console.log('Redirecting to:', targetUrl);
            //         window.location.href = targetUrl;
            //     });
            // } 

            const role = (sessionStorage.getItem('userRole') || '').toLowerCase();
            const currentPage = window.location.pathname.toLowerCase();

            console.log('userRole:', role);
            console.log('currentPage:', currentPage);
        } else {
            console.warn('#globalHeader element not found in DOM');
        }
    } catch (error) {
        console.error('Error during globalHeader init:', error);
    }
});

// Header dropdown menu toggle
document.addEventListener('click', function (event) {
    const toggleBtn = document.querySelector('[data-menu="menu_L8804321173964414"]');
    const menu = document.getElementById('menu_L8804321173964414');

    if (!toggleBtn || !menu) return;

    if (toggleBtn.contains(event.target)) {
        const isVisible = menu.style.display === 'block';
        menu.style.display = isVisible ? 'none' : 'block';
        console.log(`Menu toggled: ${isVisible ? 'hide' : 'show'}`);
    } else if (!menu.contains(event.target)) {
        menu.style.display = 'none';
        console.log('Menu hidden (outside click)');
    }
});

/* ---------------------------
   Helpers
---------------------------- */
function getAssetPath(fileName) {
    const parts = window.location.pathname.split('/').filter(Boolean);

    // If inside a subfolder like /amo/home.html → use ../assets
    if (parts.length > 1) {
        return `../assets/partials/${fileName}`;
    }
    return `assets/partials/${fileName}`;
}

// function getEnvBasePath() {
//     const host = window.location.hostname;

//     // Staging (local or internal IP)
//     if (host.includes('192.168') || host.includes('localhost')) {
//         return 'http://192.168.5.247/indian_medicine';
//     }

//     // Production
//     return 'https://indianmedicine.tn.gov.in';
// }

function getEnvBasePath() {
    const host = window.location.hostname;

    // Local / Internal IP
    if (host.includes('192.168') || host.includes('localhost')) {
        return 'http://192.168.5.247/indian_medicine';
    }

    // Staging
    if (host.includes('tngis.tnega.org')) {
        return 'https://tngis.tnega.org/indian_medicine';
    }

    // Production
    return 'https://indianmedicine.tn.gov.in';
}


function getCurrentFolder() {
    // Extracts folder like "amo", "admin", etc., but skips "indian_medicine"
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length > 1 && parts[0].toLowerCase() === 'indian_medicine') {
        return parts[1] || '';
    }
    return '';
}
