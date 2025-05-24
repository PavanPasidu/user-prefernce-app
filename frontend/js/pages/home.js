import { loadProfileImage } from "../utils/imageLoader.js";
import { accountForm } from "../components/settings/accountForm.js";
import { authAjax } from "../utils/authAjax.js";

export const homePage = {
  id: "homePage",
  view: "layout",
  type: "wide",
  cols: [
    {
      gravity: 1,
      rows: [
        {
          view: "template",
          id: "userAvatarBlock",
          css: "user-avatar-block",
          template: "",
          on: {
            onAfterRender: webix.once(async function () {
              loadProfileImage();
            }),
          },
        },
        {
          id: "aboutMeBlock",
          view: "template",
          css: "about-me-block",
          template: function () {
            const values = $$("personalForm")?.getValues() || {};
            return `
              <div style="padding: 2vh;">
                <h1>About Me</h1>
                <p style="margin-bottom: 2vh;text-align: justify;">${values.aboutme || "No description provided."}</p>
                <div style="display: grid; grid-template-columns: max-content 1fr; row-gap: 1vh; column-gap: 1vw;">
                  <div><strong>Full Name:</strong></div><div>${values.fullname || "-"}</div>
                  <div><strong>Gender:</strong></div><div>${values.gender || "-"}</div>
                  <div><strong>Date of Birth:</strong></div><div>${values.dob || "-"}</div>
                </div>
              </div>
            `;
          },
        },
      ],
    },
    {
      gravity: 2,
      view: "template",
      css: "mainContent",
      template: `
        <div class="main-content" style="padding: 4vh;">
          <h2>Main Content Area</h2>
          <p>This is where dynamic components or settings will appear. This column grows with screen size.</p>
        </div>
        <div style="text-align: center; padding: 2vh;">
          <img src="./assets/images/background.png" 
                style="max-width: 40%; height: auto; border-radius: 50%; object-fit: cover;" />
          <h3 style="margin-top: 1vh;">Customize user prefernces</h3>
        </div>
      `,
    },
  ],
};

// Fetch and set data once UI is ready
webix.ready(async () => {
  try {
    const res = await authAjax("http://127.0.0.1:8000/api/account/settings/");
    const data = await res.json();

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
});
