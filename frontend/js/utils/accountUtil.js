export const personalSection = {
  view: "form",
  id: "personalForm",
  gravity: 1,
  padding: { left: 20, right: 20, top: 10, bottom: 10 },
  elements: [
    { template: "Personal Details", type: "section" },
    {
      view: "text",
      label: "Full Name",
      name: "fullname",
      labelWidth: 120,
      required: true
    },
    {
      view: "datepicker",
      label: "DOB",
      name: "dob",
      labelWidth: 120,
      stringResult: true,
      format: "%Y-%m-%d",
      required: true
    },
    {
      view: "combo",
      label: "Gender",
      name: "gender",
      labelWidth: 120,
      options: ["Male", "Female", "Other"]
    }
  ],
  rules: {
    fullname: webix.rules.isNotEmpty,
    dob: webix.rules.isNotEmpty
  },
  on: {
    onAfterRender: function () {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (!loggedUser?.access) return;

      const token = loggedUser.access;
      webix.ajax()
        .headers({ "Authorization": "Bearer " + token })
        .get("http://127.0.0.1:8000/api/account/settings/", function (res) {
          const data = res.json();
          $$("personalForm")?.setValues(data);
        })
        .fail(() => {
          webix.message({ type: "error", text: "Failed to load personal details" });
        });
    }
  }
};




// function toggleVisibility(field) {
//   const type = field.config.type;
//   field.define("type", type === "password" ? "text" : "password");
//   field.define("icon", type === "password" ? "mdi mdi-eye" : "mdi mdi-eye-off");
//   field.refresh();
// }


function toggleVisibility(field) {
  const input = field.getInputNode();
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  field.define("icon", isPassword ? "mdi mdi-eye" : "mdi mdi-eye-off");
  field.refresh();
}

const passwordUpdateHandler = () => {
  const oldPassword = $$("oldPwd").getValue();
  const newPassword = $$("newPwd").getValue();
  const confirmPassword = $$("confirmPwd").getValue();

  if (!oldPassword || !newPassword || !confirmPassword) {
    webix.message({ type: "error", text: "All fields are required" });
    return;
  }

  if (newPassword !== confirmPassword) {
    webix.message({ type: "error", text: "Passwords do not match!" });
    return;
  }

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const token = loggedUser.access;

  webix.ajax()
    .headers({ "Authorization": "Bearer " + token })
    .post("http://127.0.0.1:8000/api/account/change-password/", {
      oldPassword,
      newPassword,
      confirmPassword
    })
    .then(() => {
      webix.message("Password updated successfully!");
      // Optionally clear fields:
      $$("oldPwd").setValue("");
      $$("newPwd").setValue("");
      $$("confirmPwd").setValue("");
    })
    .catch(() => {
      webix.message({ type: "error", text: "Failed to update password" });
    });
};

export const passwordSection = {
  view: "fieldset",
  label: "Password",
  body: webix.env.mobile
    ? {
        rows: [
          {
            view: "text",
            type: "password",
            label: "Old Password",
            name: "oldPassword",
            id: "oldPwd",
            icon: "mdi mdi-eye-off",
            labelWidth: 120,
            on: {
              onItemClick: function (id, e) {
                if (e.target.classList.contains("mdi")) toggleVisibility(this);
              }
            }
          },
          {
            view: "text",
            type: "password",
            label: "New Password",
            name: "newPassword",
            id: "newPwd",
            icon: "mdi mdi-eye-off",
            labelWidth: 120,
            on: {
              onItemClick: function (id, e) {
                if (e.target.classList.contains("mdi")) toggleVisibility(this);
              }
            }
          },
          {
            view: "text",
            type: "password",
            label: "Confirm Password",
            name: "confirmPassword",
            id: "confirmPwd",
            icon: "mdi mdi-eye-off",
            labelWidth: 120,
            on: {
              onItemClick: function (id, e) {
                if (e.target.classList.contains("mdi")) toggleVisibility(this);
              }
            }
          },
          {
            view: "button",
            label: "Update Password",
            css: "webix_primary",
            click: passwordUpdateHandler
          }
        ],
        padding: 10
      }
    : {
        cols: [
          {
            rows: [
              {
                view: "text",
                type: "password",
                label: "Old Password",
                name: "oldPassword",
                id: "oldPwd",
                icon: "mdi mdi-eye-off",
                labelWidth: 120,
                on: {
                  onItemClick: function (id, e) {
                    if (e.target.classList.contains("mdi")) toggleVisibility(this);
                  }
                }
              }
            ],
            gravity: 1,
            padding: 10
          },
          {
            rows: [
              {
                view: "text",
                type: "password",
                label: "New Password",
                name: "newPassword",
                id: "newPwd",
                icon: "mdi mdi-eye-off",
                labelWidth: 120,
                on: {
                  onItemClick: function (id, e) {
                    if (e.target.classList.contains("mdi")) toggleVisibility(this);
                  }
                }
              },
              {
                view: "text",
                type: "password",
                label: "Confirm Password",
                name: "confirmPassword",
                id: "confirmPwd",
                icon: "mdi mdi-eye-off",
                labelWidth: 120,
                on: {
                  onItemClick: function (id, e) {
                    if (e.target.classList.contains("mdi")) toggleVisibility(this);
                  }
                }
              },
              {
                view: "button",
                label: "Update Password",
                css: "webix_primary",
                click: passwordUpdateHandler
              }
            ],
            gravity: 1,
            padding: 10
          }
        ]
      }
};
