(function () {
  function redirectToLogin() {
    sessionStorage.clear();
    window.location.replace("../index.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
    if (!userName || !userRole) redirectToLogin();
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      const userName = sessionStorage.getItem("userName");
      if (!userName) redirectToLogin();
    }
  });
})();
