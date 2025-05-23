export const profileSection = {
  id: "profileSection",
  rows: [
    {
      cols: [
        {
          view: "template",
          id: "profileImage",
          template:
            "<div style='text-align:center'><img src='../../assets/images/pavan.jpeg' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>",
          gravity: 1,
          borderless: true,
          padding: { left: 20, right: 20, top: 9, bottom: 11 }
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
                  upload: "/upload/",
                  value: "Upload",
                  name: "image",
                  accept: "image/png, image/jpeg",
                  autosend: true,
                  width: 130,
                  on: {
                    onUploadComplete: function (response) {
                      const filename =
                        response[0]?.filePath || response[0]?.name;
                      $$("profileImage").setHTML(
                        `<div style='text-align:center'><img src='../../assets/images/${filename}' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
                      );
                    }
                  }
                },
                { width: 15 },
                {
                  view: "button",
                  value: "Remove Image",
                  width: 130,
                  click: function () {
                    $$("profileImage").setHTML(
                      `<div style='text-align:center'><img src='../../assets/images/default-profile-img.png' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
                    );
                    webix.message("Profile image removed");
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
  ]
};
