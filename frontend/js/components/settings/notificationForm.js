export const notificationForm = {
  id: "notificationFormWrapper",
  view: "scrollview",
  scroll: "y",
  body: {
    view: "form",
    id: "notificationForm",
    responsive: true,
    elementsConfig: {
      labelWidth: 180,
    },
    rows: [
      { template: "🔕 Notification Settings", type: "section" },

      {
        view: "switch",
        id: "muteAll",
        name: "muteAll",
        label: "Mute All Notifications",
        value: 0,
        on: {
          onChange: function (newVal) {
            const disabled = newVal === 1;
            [
              "emailNotify", "smsNotify", "pushNotify", "volumeSlider", "toneSelect",
              "previewBtn", "dndStart", "dndEnd", "notifyFreq", "langSelect",
              "desktopNotify", "testNotifyBtn"
            ].forEach(id => {
              const el = $$(id);
              if (el) {
                disabled ? el.disable() : el.enable();
              }
            });
          },
        },
      },

      { view: "checkbox", id: "emailNotify", name: "emailNotify", label: "Email Notifications", value: 1 },
      { view: "checkbox", id: "smsNotify", name: "smsNotify", label: "SMS Notifications", value: 0 },
      { view: "checkbox", id: "pushNotify", name: "pushNotify",label: "Push Notifications", value: 1 },

      {
        cols: [
          {
            view: "slider",
            id: "volumeSlider",
            name: "volumeSlider",
            label: "Notification Volume",
            min: 0, max: 100, value: 70,
            step: 1, title: webix.template("#value#%"),
            on: {
              onChange: function (value) {
                $$("volumeLabel").setValue(`Volume: ${value}%`);
              }
            }
          },
          { view: "label", label: "Volume: 70%", id: "volumeLabel", width: 100 },
        ],
      },

      {
        view: "combo",
        id: "toneSelect",
        name: "toneSelect",
        label: "Notification Tone",
        options: [
          { id: "long_pop", value: "Long_pop" },
          { id: "pop_alert", value: "Pop_alert" },
          { id: "light_button", value: "Light_button" },
          // { id: "ding", value: "Ding" },
        ],
        value: "pop_alert",
      },

      {
        view: "button",
        id: "previewBtn",
        value: "🔊 Preview Tone",
        css: "webix_primary",
        width: 160,
        click: function () {
          const tone = $$("toneSelect").getValue();
          const volume = $$("volumeSlider").getValue() / 100;
          const audioMap = {
            long_pop: "../../../assets/audio/long-pop.wav",
            pop_alert: "../../../assets/audio/pop-alert.mp3",
            light_button: "../../../assets/audio/light-button.wav",
            // ding: "../../../assets/audio/ding.wav",
          };
          const audioSrc = audioMap[tone] || audioMap["ding"];
          const audio = new Audio(audioSrc);
          audio.volume = volume;
          audio.play().catch(() => {
            webix.message({ type: "error", text: "Unable to play the audio tone." });
          });
        },
      },

      { template: "⏰ Advanced Preferences", type: "section" },

      {
        view: "fieldset", label: "Do Not Disturb (DND)",
        body: {
          cols: [
            { view: "datepicker", id: "dndStart", name: "dndStart", label: "Start", type: "time", value: "22:00" },
            { view: "datepicker", id: "dndEnd",  name: "dndEnd", label: "End", type: "time", value: "07:00" }
          ]
        }
      },

      {
        view: "radio",
        id: "notifyFreq",
        name: "notifyFreq",
        label: "Notification Frequency",
        value: "instant",
        options: [
          { id: "instant", value: "Instant" },
          { id: "hourly", value: "Hourly" },
          { id: "daily", value: "Daily Summary" },
        ],
      },

      {
        view: "select",
        borderless: true,
        id: "langSelect",
        name: "langSelect",
        label: "Notification Language",
        value: "english",
        options: [
          { id: "english", value: "English" },
          { id: "spanish", value: "Spanish" },
          { id: "german", value: "German" },
        ],
      },

      {
        view: "switch",
        id: "desktopNotify",
        name: "desktopNotify",
        label: "Enable Desktop Notifications",
        value: 1,
      },

      {
        view: "button",
        id: "testNotifyBtn",
        value: "🧪 Send Test Notification",
        width: 220,
        click: function () {
          webix.message("🔔 Test notification sent!");
        },
      },

      {
        margin: 10,
        cols: [
          {
            view: "button", value: "Save", css: "webix_primary",
            click: function () {
              const form = $$("notificationForm");
              const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
              const token = loggedUser.access;
              if (form.validate()) {
                const values = form.getValues(); 
                // change time to corrrect format
                ["dndStart", "dndEnd"].forEach(key => {
                  const time = values[key];
                  if (time instanceof Date) {
                    const hours = time.getHours().toString().padStart(2, "0");
                    const minutes = time.getMinutes().toString().padStart(2, "0");
                    values[key] = `${hours}:${minutes}`;
                  }
                });
                console.log(values);

                webix
                  .ajax()
                  .headers({ "Authorization": `Bearer ${token}` })
                  .post("http://127.0.0.1:8000/api/save-notification-settings/", values)
                  .then(() => {
                    webix.message("Notification settings saved.");
                  })
                  .catch(() => {
                    webix.message({ type: "error", text: "Failed to save notification settings." });
                  });
              }
            },
          },
          {
            view: "button", value: "Cancel",
            click: function () {
              loadNotificationSettings();
            },
          },
          {
            view: "button", value: "Reset to Default",
            css: "webix_secondary",
            click: function () {
              const defaults = {
                muteAll: 0,
                emailNotify: 1,
                smsNotify: 0,
                pushNotify: 1,
                volumeSlider: 70,
                toneSelect: "ding",
                dndStart: "22:00",
                dndEnd: "07:00",
                notifyFreq: "instant",
                langSelect: "english",
                desktopNotify: 1,
              };
              $$("notificationForm").setValues(defaults);
              $$("volumeLabel").setValue("Volume: 60%");
              webix.message("Settings reset to default.");
            },
          },
        ],
      },
    ],
  },
  on: {
    onViewShow: function() {
      loadNotificationSettings();
    }
  }

};

// Helper function to load settings from server
function loadNotificationSettings() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const token = loggedUser.access;
  webix
    .ajax()
    .headers({ "Authorization": `Bearer ${token}` })
    .get("http://127.0.0.1:8000/api/get-notification-settings/")
    .then((data) => {
      const settings = data.json();
      if (settings) {
        $$("notificationForm").setValues(settings);
        $$("volumeLabel").setValue(`Volume: ${settings.volumeSlider || 70}%`);
      }
    })
    .catch(() => {
      webix.message({ type: "error", text: "Failed to load notification settings." });
    });
}

// // Call load on form initialization
// loadNotificationSettings();
