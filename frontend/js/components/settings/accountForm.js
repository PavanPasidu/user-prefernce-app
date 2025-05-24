import { personalSection, passwordSection } from "../../utils/accountUtil.js";
import { profileSection } from "../../utils/pofileUtil.js";
import { authAjax } from "../../utils/authAjax.js";

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
                click: async function () {

                  const profileData = $$("profileForm").getValues();
                  // console.log("profile: ",$$("profileForm").getValues());
                  const personalData = $$("personalForm").getValues();
                  // console.log("personal accountform:",$$("personalForm").getValues());
                  const passwordData = {
                    oldPassword: $$('oldPwd').getValue(),
                    newPassword: $$('newPwd').getValue(),
                    confirmPassword: $$('confirmPwd').getValue()
                  };
                  const payload = { ...profileData, ...personalData,...passwordData };
                  console.log("Payload:",payload);

                  // const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
                  // const token = loggedUser.access;

                  try {
                    await authAjax("http://127.0.0.1:8000/api/account/settings/", "POST", payload);
                    webix.message("All changes saved successfully!");
                  } catch (err) {
                    webix.message({ type: "error", text: err.responseText || "Error saving settings." });
                  }
                }
              },
            ]
          }
        ]
      }
    }
  ],
  on: {
    onViewShow: async function () {
      try {
        const res = await authAjax("http://127.0.0.1:8000/api/account/settings/");
        const data = await res.json();

        // Filter fields specific to each form
        const profileData = {
          username: data.username,
          email: data.email,
        };

        const personalData = {
          fullname: data.fullname,
          gender: data.gender,
          dob: data.dob,
          aboutme: data.aboutme,
        };

        $$("profileForm")?.setValues(profileData);
        $$("personalForm")?.setValues(personalData);
        $$("aboutMeBlock")?.refresh();
      } catch (err) {
        console.error("Error fetching account settings:", err);
      }
    }
  },

};
