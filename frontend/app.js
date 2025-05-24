import { loginWindow } from "./js/components/login.js";
import { signupWindow } from "./js/components/signup.js";
import { navbar } from "./js/components/navbar.js";
import {settingsMenu} from "./js/utils/settingMenu.js";
import { settingsView } from "./js/pages/settings.js";
import { homePage } from "./js/pages/home.js";
import { logouthomePage } from "./js/pages/logouthome.js";
import { fetchThemeSettings, applyThemeSettings } from "./js/components/settings/themeForm.js";
import {loadProfileImage} from "./js/utils/imageLoader.js";

// console.log("app.js loaded");
// logouthomePage

webix.ready(() => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const savedTheme = localStorage.getItem("customTheme");
    if (savedTheme) {
        const themeSettings = JSON.parse(savedTheme);
        applyThemeSettings(themeSettings);

        // Also update the forms if needed:
        $$("color-settings")?.setValues(themeSettings, true);
        $$("font-settings")?.setValues(themeSettings, true);
        $$("layout-settings")?.setValues(themeSettings, true);
        $$("Custom_mode")?.setValue(1);  // set the checkbox back to ON
    }


  webix.ui({
    id: "mainLayout",
    rows: [
      navbar,
      {
        cells: loggedUser ? [homePage, settingsView] : [logouthomePage],
        animate: { type: "slide", subtype: "together" },
        id: "mainViews"
      },
      // loadProfileImage()
    ]
  });
  // $$("userAvatarBlock").refresh();

  webix.ui(loginWindow);
  webix.ui(signupWindow);
  // $$("loginWindow").show();
  webix.ui(settingsMenu);
  // console.log($$("loginWindow"));

  // $$("settingsView").attachEvent("onViewShow", function(id) {
  //   if (id === "settingsView") {
  //     const savedTheme = localStorage.getItem("customTheme");
  //     if (savedTheme) {
  //       const themeSettings = JSON.parse(savedTheme);
  //       // Update all theme-related forms
  //       $$("color-settings")?.setValues(themeSettings, true);
  //       $$("font-settings")?.setValues(themeSettings, true);
  //       $$("layout-settings")?.setValues(themeSettings, true);
  //       $$("Custom_mode")?.setValue(1);
  //       // Reapply CSS variables globally
  //       applyThemeSettings(themeSettings);
  //     }
  //   }
  // });


  webix.ui({
    view: "popup",
    id: "profileMenu",
    body: {
      view: "list",
      data: [
        { id: "profile", value: "Profile" },
        { id: "logout", value: "Logout" }
      ],
      autoheight: true,
      borderless: true,
      select: true,
      on: {
        onItemClick: function (id) {
          if (id === "logout") {
            localStorage.removeItem("loggedUser");
            location.reload();
          } else if (id === "profile") {
            webix.message("Go to Profile");
          }
        }
      }
    }
  });
  // console.log($$("navbar"));
  // console.log(localStorage.getItem("token")); 
});


