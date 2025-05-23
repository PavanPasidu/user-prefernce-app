export const settingsMenu = {
  view: "popup",
  id: "settingsMenu",
  body: {
    view: "form",
    // width: 300,
    gravity:4,
    padding: { left: 10, right: 10, bottom: 40 },
    elements: [
      {
        cols: [
          { template: "Notifications", borderless: true },
          {
            view: "switch",
            name: "notifications",
            on: {
              onChange: function (val) {
                webix.message("Notifications " + (val ? "On" : "Off"));
              }
            }
          }
        ]
      },
      {
        cols: [
          { template: "Dark Theme", borderless: true },
          {
            view: "switch",
            name: "darkTheme",
            on: {
              onChange: function (val) {
                // webix.message("Dark Theme " + (val ? "Enabled" : "Disabled"));
                document.body.classList.toggle("dark-theme", val);
              }
            }
          }
        ]
      },
      {
        margin: 10, // Adds spacing above
        cols: [
          {
            view: "button",
            value: "Advanced Settings",
            css: "webix_secondary",
            click: () => $$("mainViews").setValue("settingsView")
          },
          {gravity:0.1}

        ]
      }
    ]
  }
};
