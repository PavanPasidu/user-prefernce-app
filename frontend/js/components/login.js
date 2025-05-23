// js/components/login.js
export const loginWindow = {
  view: "window",
  id: "loginWindow",
  width: 350,
  position: "center",
  modal: true,
  head: "Login",
  body: {
    view: "form",
    id: "loginForm",
    // margin: {  left: 10, right: 20},
    padding: {  left: 10, right: 40, bottom: 40},
    rows: [
      { view: "text", name: "username", label: "Username", labelWidth: 90, labelAlign: "left", align:"center", required: true },
      { view: "text", name: "password", label: "Password", labelWidth: 90, labelAlign: "left", align:"center", type: "password", required: true },
      { view: "template", id: "loginErrorLabel", template: "", borderless: true, height: 25, hidden: true },
      {
        margin: 8,
        align: "center",
        cols: [
          {
            view: "button",
            value: "Login",
            css: "webix_primary",
            click: () => {
              const form = $$("loginForm");
              if (form.validate()) {
                const values = form.getValues();
                webix.ajax().post("http://127.0.0.1:8000/api/login/", values)
                  .then((res) => {
                    const data = res.json();
                    const token = res.access;
                    localStorage.setItem("token", token); 
                    // console.log(localStorage.getItem("token")); 
                    localStorage.setItem("loggedUser", JSON.stringify(data));
                    webix.message("Login successful!");
                    $$("loginWindow").hide();
                    location.reload();
                  })
                  .catch((err) => {
                    if (err.status === 404) {
                    $$("loginErrorLabel").define("template", "<span style='color:red;font-size:13px;'>User not found. Please sign up..</span>");
                    $$("loginErrorLabel").show();
                    } else {
                      $$("loginErrorLabel").define("template", "<span style='color:red;font-size:13px;'>Invalid credentials, please sign up to log in.</span>");
                      $$("loginErrorLabel").show();
                    }
                  });
              }
            }
          },
          {
            view: "button",
            value: "Cancel",
            click: () => {
              const form = $$("loginForm");
              form.clear();
              $$("loginWindow").hide();
            }
          },
          { width: 10 },
        ]
      },
      {
        view: "label",
        label: "<u style='cursor:pointer;color:#1e88e5;'>New user? Sign up here</u>",
        align: "center",
        on: {
          onItemClick: () => {
            $$("loginWindow").hide();
            $$("signupWindow").show();
          }
        }
      }
    ],
    rules: {
      "username": webix.rules.isNotEmpty,
      "password": webix.rules.isNotEmpty
    }
  }
};
