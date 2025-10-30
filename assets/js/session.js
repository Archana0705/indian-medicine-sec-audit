// session.js
async function initializeUserSession(mobnumber) {
  return new Promise((resolve, reject) => {
    const payload = {
      action: "function_call",
      function_name: "IM_USER_LOGIN_FN",
      params: {
        mobnumber: parseInt(mobnumber, 10),
      },
    };

    const apiUrl = `${BASE_API_URL}/commonfunction`;

    $.ajax({
      url: apiUrl,
      method: "POST",
      headers: {
        "X-APP-Key": "edm",
        "X-APP-Name": "edm",
      },
      data: { data: encryptData(payload) },
      dataType: "json",
      cache: false,
      success: function (response) {
        try {
          if (!response?.data) throw new Error("Invalid response format");

          const decryptedResponse = decryptData(response.data);
          if (!Array.isArray(decryptedResponse) || !decryptedResponse.length)
            throw new Error("Empty user data");

          const user = decryptedResponse[0];

          const userSession = {
            name: user.name || "",
            role: user.login_type || "",
            district: user.district || "",
            designation: user.designation || "",
            system: user.system || "",
            institutionName: user.name_of_the_institution || "",
            mobnumber: mobnumber,
          };

          const encryptedSession = encryptData(userSession);
          sessionStorage.setItem("encryptedUserSession", encryptedSession);
          sessionStorage.setItem("loginTime", Date.now().toString());

          console.log("✅ Session initialized successfully:", userSession);
          resolve(userSession);
        } catch (err) {
          console.error("Session initialization error:", err);
          reject(err);
        }
      },
      error: function (xhr) {
        console.error("API call failed:", xhr.responseText);
        reject(new Error("API call failed"));
      },
    });
  });
}

// 🔓 Global helper to access decrypted session
function getDecryptedUserSession() {
  try {
    const encryptedSession = sessionStorage.getItem("encryptedUserSession");
    if (!encryptedSession) return null;
    return decryptData(encryptedSession);
  } catch (err) {
    console.error("Error decrypting session:", err);
    return null;
  }
}

window.initializeUserSession = initializeUserSession;
window.getDecryptedUserSession = getDecryptedUserSession;
