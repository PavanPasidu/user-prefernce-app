import {accountForm} from "../components/settings/accountForm.js";
import {notificationForm} from "../components/settings/notificationForm.js";
import {privacyForm} from "../components/settings/privacyForm.js";
import {themeForm,applyThemeSettings} from "../components/settings/themeForm.js";


export const settingsView = {
  id: "settingsView",
  responsive: true,
  type: "clean",
  // view: "layout",
  rows: [
    // Tab Toolbar
    {
      view: "segmented",
      id: "settingsTabBar",
      multiview: true,
      css:"webix_segment_0",
      options: [
        { id: "accountForm", value: "Account" },
        { id: "notificationFormWrapper", value: "Notification" },
        { id: "privacyForm", value: "Privacy" },
        { id: "themeForm", value: "Appearance" }
      ],
      on: {
        onChange: function (tabId) {
          $$("settingsContent").setValue(tabId); // switch content

          if (tabId === "notificationFormWrapper" || "privacyForm" || "themeForm" || "accountForm") {
            const savedTheme = localStorage.getItem("customTheme");
            if (savedTheme) {
              const themeSettings = JSON.parse(savedTheme);
              // Apply theme to the app
              applyThemeSettings(themeSettings);
              // Update the forms to show saved values
              $$("color-settings")?.setValues(themeSettings, true);
              $$("font-settings")?.setValues(themeSettings, true);
              $$("layout-settings")?.setValues(themeSettings, true);
              // Set the custom mode checkbox
              $$("Custom_mode")?.setValue(themeSettings.Custom_mode || 0);
            }
          }
        }
      }
    },
    // Tab Content
    {
      view: "multiview",
      id: "settingsContent",
      keepViews: true,
      // css:"label",
      animate: { type: "slide", subtype: "together" },
      cells: [
        {
          id: "accountForm",
          ...accountForm,
          // template: "Account Settings Page",
          responsive: true
        },
        {
          id: "notificationFormWrapper",
          ...notificationForm,
          // template: "Notice Settings Page",
          responsive: true
          // css: "settingsTabContent"
        },
        {
          id: "privacyForm",
          ...privacyForm,
          // template: "Privacy Settings Page",
          responsive: true
          // css: "settingsTabContent"
        },
        {
          id: "themeForm",
          ...themeForm,
          // template: "Appearance Settings Page",
          responsive: true
          // css: "settingsTabContent"
        }
      ]
    }
  ]
};
