export async function authAjax(url, method = "GET", data = null) {
  const tokens = JSON.parse(localStorage.getItem("loggedUser") || "{}");
  let accessToken = tokens.access;

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    return await webix.ajax().headers(headers)[method.toLowerCase()](url, data);
  } catch (err) {
    if ((err.status === 401 || err.status === 403) && tokens.refresh) {
      const refreshed = await refreshToken(tokens.refresh);
      if (refreshed) {
        accessToken = refreshed;
        const updatedTokens = { ...tokens, access: refreshed };
        localStorage.setItem("loggedUser", JSON.stringify(updatedTokens));
        console.log("Updated loggedUser object:", updatedTokens);

        return await webix.ajax()
          .headers({ Authorization: `Bearer ${refreshed}` })
          [method.toLowerCase()](url, data);
      }
    }
    throw err;
  }
}

async function refreshToken(refresh) {
  try {
    const res = await webix.ajax().post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
    return res.json().access;
  } catch (e) {
    console.error("Refresh token invalid or expired");
    logoutUser();
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem("loggedUser");
  webix.message("Session expired. Please log in again.");
  
}
