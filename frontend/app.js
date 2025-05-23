import { loginWindow } from "./js/components/login.js";
import { signupWindow } from "./js/components/signup.js";
import { navbar } from "./js/components/navbar.js";
import {settingsMenu} from "./js/utils/settingMenu.js";
import { settingsView } from "./js/pages/settings.js";
import { homePage } from "./js/pages/home.js";
import { logouthomePage } from "./js/pages/logouthome.js";
import { applyThemeSettings } from "./js/utils/themeManage.js";

// console.log("app.js loaded");
// logouthomePage

webix.ready(() => {
  const savedSettings = JSON.parse(localStorage.getItem("themeSettings"));
  applyThemeSettings(savedSettings);
  // console.log($$("savedSettings"));

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  webix.ui({
    id: "mainLayout",
    rows: [
      navbar,
      {
        cells: loggedUser ? [homePage, settingsView] : [logouthomePage],
        animate: { type: "slide", subtype: "together" },
        id: "mainViews"
      }
    ]
  });

  webix.ui(loginWindow);
  webix.ui(signupWindow);
  // $$("loginWindow").show();
  webix.ui(settingsMenu);
  // console.log($$("loginWindow"));

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


