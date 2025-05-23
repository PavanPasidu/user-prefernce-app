export const signupWindow = {
  view: "window",
  id: "signupWindow",
  width: 400,
  position: "center",
  modal: true,
  head: "Sign Up",
  body: {
    view: "form",
    id: "signupForm",
    padding: { left: 20, right: 20, bottom: 20 },
    elements: [
      { view: "text", name: "username", label: "Username", labelWidth:90, required: true },
      { view: "text", name: "password", label: "Password", labelWidth:90, type: "password", required: true },
      { view: "text", name: "email", label: "Email", labelWidth:90, required: true },
      {
        cols: [
          {
            view: "button",
            value: "Register",
            css: "webix_primary",
            click: () => {
              const form = $$("signupForm");
              if (form.validate()) {
                const values = form.getValues();
                webix.ajax().post("http://127.0.0.1:8000/api/register/", values)
                  .then(() => {
                    // After successful signup, do login request
                    webix.ajax().post("http://127.0.0.1:8000/api/login/", {
                      username: values.username,
                      password: values.password
                    }).then(res => {
                      const data = res.json();
                      const token = res.access;
                      localStorage.setItem("token", token);
                      localStorage.setItem("loggedUser", JSON.stringify(data));
                      webix.message("Signup and login successful!");
                      $$("signupWindow").hide();
                      location.reload();
                    }).catch(() => {
                      webix.message("Signup succeeded but auto-login failed. Please login manually.");
                      $$("signupWindow").hide();
                      $$("loginWindow").show();
                      $$("loginForm").setValues({ username: values.username });
                    });
                  })
                  .catch(() => {
                    webix.message({ type: "error", text: "Signup failed." });
                  });
              }
            }
          },
          {
            view: "button",
            value: "Cancel",
            click: () => {
              $$("signupWindow").hide();
              $$("loginWindow").show();
            }
          }
        ]
      }
    ],
    rules: {
      username: webix.rules.isNotEmpty,
      password: webix.rules.isNotEmpty,
      email: webix.rules.isEmail
    }
  }
};
