import { loginWindow } from "./login.js";
import {homePage} from "../pages/home.js";

let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;
console.log(isLogin);

export const navbar = {
  view: "toolbar",
  css: "topNavbar",
  padding: 9,
  height: 65,
  cols: [
    ...(isLogin
      ?[
      { 
        view: "icon", 
        icon: "mdi mdi-home", 
        tooltip: "Home", 
        css: "navIcon",
        click: () => {
          $$("homePage").show("homePage");
        } 
      },
      { template: "Demo App", type: "header", css: "titleText" },
      {},
      {view: "icon", icon: "mdi mdi-bell", tooltip: "Notifications", badge:"5",css: "navIcon"},
      {
        view: "icon", 
        icon: "mdi mdi-cog", 
        tooltip: "Settings", 
        css: "navIcon",
        click: function () {
          const node = this.$view;
          $$("settingsMenu").show(node);
        }
      },
      {
        view: "template",
        tooltip: "Profile",
        template: "<div class='avatar-wrapper'><img src='./assets/images/pavan.jpeg' alt='Profile' class='mainphoto'/> <span class='webix_icon mdi mdi-circle status green'></span> </div>",
        width: 80,
        borderless: true,
        css: "avatar spaced",
        onClick: {
          "avatar-wrapper": function () {
            const node = this.$view;
            $$("profileMenu").show(node);
          }
        }
      }
      ]

      :[
        { template: "Demo App", type: "header", css: "titleText" },
        {},
        {
          view: "button",
          label: "Login / Signup",
          css: "webix_primary",
          width: 120,
          click: () => {
            // fake login action for demo
            $$("loginWindow").show();
            document.body.style.overflow = "visible";
            // localStorage.setItem("loggedUser", true);
            // location.reload(); // reload to re-render navbar
          },
        },
        { width: 15 }, 
      ]
  )
  ]
};
