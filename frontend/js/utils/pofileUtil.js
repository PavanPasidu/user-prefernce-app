import {loadProfileImage} from "./imageLoader.js";

export const profileSection = {
  id: "profileSection",
  rows: [
    {
      cols: [
        {
          view: "template",
          id: "profileImage",
          template: "", 
          gravity: 1,
          borderless: true,
          padding: { left: 20, right: 20, top: 9, bottom: 11 },
          on: {
            onViewShow: function () {
              loadProfileImage(); 
            }
          }
        },
        {
          view: "form",
          id: "profileForm",
          gravity: 3,
          // css:"label",
          padding: { left: 20, right: 20, top: 10, bottom: 10 },
          elements: [
            { template: "Profile Info", type: "section" },
            {
              view: "text",
              label: "Username",
              name: "username",
              labelWidth: 120,
              // css:"label",
              required: true
            },
            {
              view: "text",
              label: "Email",
              name: "email",
              labelWidth: 120,
              // css:"label",
              required: true
            },
            {
              cols: [
                {
                  view: "uploader",
                  id: "profileUploader",
                  label: "Upload Image",
                  upload: "http://127.0.0.1:8000/api/upload/",
                  value: "Upload",
                  name: "image",
                  accept: "image/png, image/jpeg",
                  autosend: false,
                  width: 130,
                  on: {
                    onAfterFileAdd: function (file) {
                      const uploader = this;
                      const formData = new FormData();
                      formData.append("image", file.file); // file.file is the raw File object

                      const token = JSON.parse(localStorage.getItem("loggedUser"))?.access;

                      webix
                        .ajax()
                        .headers({
                          Authorization: `Bearer ${token}`,
                        })
                        .post("http://127.0.0.1:8000/api/upload/", formData)
                        .then((response) => {
                          const imageUrl = response.json().filePath;
                          if (imageUrl) {
                            $$("profileImage").setHTML(
                              `<div style='text-align:center'><img src='${imageUrl}' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
                            );
                            $$("userAvatarBlock")?.refresh();
                            webix.message("Profile image updated!");
                            loadProfileImage();
                            // $$("userAvatarBlock")?.refresh();
                          }
                        })
                        .catch(() => {
                          webix.message({
                            type: "error",
                            text: "Image upload failed.",
                          });
                        });

                      // Remove from uploader list to prevent UI stacking
                      uploader.files.clearAll();
                    },
                  },
                },
                { width: 15 },
                {
                  view: "button",
                  value: "Remove Image",
                  width: 130,
                  // click: function () {
                  //   $$("profileImage").setHTML(
                  //     `<div style='text-align:center'><img src='../../assets/images/default-profile-img.png' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
                  //   );
                  //   webix.message("Profile image removed");
                  // }
                  click: function () {
                    webix.ajax().headers({
                      Authorization: "Bearer " + JSON.parse(localStorage.getItem("loggedUser") || "{}").access
                    }).post("http://127.0.0.1:8000/api/remove-image/")
                      .then(() => {
                        $$("profileImage").setHTML(
                          `<div style='text-align:center'><img src='../../assets/images/default-profile-img.png' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
                        );
                        webix.message("Profile image removed");
                      })
                      .catch(() => {
                        webix.message({ type: "error", text: "Failed to remove image." });
                      });
                  }
                },
                {}
              ]
            }
          ],
          rules: {
            username: webix.rules.isNotEmpty,
            email: webix.rules.isEmail
          }
        }
      ]
    }
  ],
  // on: {
  //   onViewInit: function () {
  //     loadProfileImage(); // fetch and display current profile image
  //   }
  // }
};
