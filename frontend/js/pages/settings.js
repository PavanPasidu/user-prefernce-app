import {accountForm} from "../components/settings/accountForm.js";
import {notificationForm} from "../components/settings/notificationForm.js";
import {privacyForm} from "../components/settings/privacyForm.js";
import {themeForm} from "../components/settings/themeForm.js";

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
