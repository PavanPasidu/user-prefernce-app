import { personalSection, passwordSection } from "../../utils/accountUtil.js";
import { profileSection } from "../../utils/pofileUtil.js";

export const accountForm = {
  id: "accountForm",
  rows: [
    {
      height: 60,
      template: "Account Settings",
      css: "header_section",
    },
    {
      view: "scrollview",
      scroll: "y",
      body: {
        padding: 20,
        rows: [
          profileSection,
          {},
          { height: 20 },
          personalSection,
          { height: 30 },
          passwordSection,
          { height: 20 },
          {
            cols: [
              { gravity: 1 },
              {
                view: "button",
                value: "Save All Changes",
                css: "webix_primary",
                inputWidth: 220,
                minWidth: 150,
                maxWidth: 300,
                align: "center",
                click: function () {
                  const profileData = $$("profileForm").getValues();
                  const personalData = $$("personalForm").getValues();
                  const passwordData = {
                    oldPassword: $$('oldPwd').getValue(),
                    newPassword: $$('newPwd').getValue(),
                    confirmPassword: $$('confirmPwd').getValue()
                  };
                  const payload = { ...profileData, ...personalData, ...passwordData };

                  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
                  const token = loggedUser.access;

                  webix.ajax()
                  .headers({ "Authorization": "Bearer " + token })
                  .post("http://127.0.0.1:8000/api/account/settings/", payload, {
                    error: function (text, data, xhr) {
                      webix.message({ type: "error", text: xhr.responseText });
                    },
                    success: function () {
                      webix.message("All changes saved successfully!");
                    }
                  });
                }
              },
            ]
          }
        ]
      }
    }
  ],
  on: {
    onViewShow: function () {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const token = loggedUser?.access;

      if (!token) {
        console.warn("No access token found.");
        return;
      }

      webix.ajax()
        .headers({ "Authorization": "Bearer " + token })
        .get("http://127.0.0.1:8000/api/account/settings/")
        .then(res => {
          const data = res.json();
          $$("profileForm")?.setValues(data);
          $$("personalForm")?.setValues(data);
        })
        .fail(err => {
          console.error("Error fetching account settings:", err);
        });
    }
  },
};
