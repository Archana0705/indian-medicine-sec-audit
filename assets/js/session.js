// <!-- ================== SESSION VALIDATION ================== -->

document.addEventListener('DOMContentLoaded', () => {
  // Get key info from sessionStorage
  const session = getDecryptedUserSession();
  // const userName = sessionStorage.getItem("userName");
  // const userMobileNumber = sessionStorage.getItem("userMobileNumber");
  // const userRole = sessionStorage.getItem("userRole");

  // If any required field missing, show toast and redirect
  if (!session.userName || !session.userMobileNumber || !session.userRole) {
    // showToast("Session expired or unauthorized access. Please log in again.", "error");
    alert("Session expired or unauthorized access. Please log in again.", "error");

    // Wait a moment before redirect (so user sees the toast)
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
    return;
  }

  // Bind username in header
  const userNameElement = document.getElementById("sessionUserName");
  if (userNameElement) {
    userNameElement.textContent = userName;
  } else {
    console.warn("Element with id='sessionUserName' not found in DOM.");
  }
});

/* ================== TOAST FUNCTION ================== */
function showToast(message, type = "info") {
  // Remove any existing toasts
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) existingToast.remove();

  // Create toast container
  const toast = document.createElement("div");
  toast.classList.add("custom-toast", type);
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}


// <!-- ================== SESSION TIMEOUT CHECK ================== -->

const loginTime = sessionStorage.getItem("loginTime");
const now = new Date().getTime();

// 30 min = 1800000 ms
if (!loginTime || (now - loginTime) > 1800000) {
  alert("Session expired. Please log in again.");
  // showToast("Session expired or unauthorized access. Please log in again.", "error"); 
  sessionStorage.clear();
  window.location.href = "../index.html";
}


// <!-- ================== LOGOUT FUNCTION ================== -->

// Logout function
// function logoutUser() {
//   // Clear all session data
//   sessionStorage.clear();
//   // Redirect to login page
//   window.location.href = "../index.html"; // adjust path if needed

//   // Disable back navigation after logout
// window.history.pushState(null, null, window.location.href);
// window.onpopstate = function () {
//   window.history.go(1);
// };

// }

// // Attach click event to the logout button
// document.addEventListener("DOMContentLoaded", () => {
//   const logoutButton = document.getElementById("logout");
//   if (logoutButton) {
//     logoutButton.addEventListener("click", (e) => {
//       e.preventDefault();
//       logoutUser();
//     });
//   }
// });


// ================== LOGOUT FUNCTION ================== //
function logoutUser() {
  // Clear all session data
  sessionStorage.clear();

  // Prevent going back (add before redirect)
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  // Now safely redirect to login page
  window.location.replace("../index.html"); // use replace to prevent back navigation
}

// Attach click event to the logout button
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
});


