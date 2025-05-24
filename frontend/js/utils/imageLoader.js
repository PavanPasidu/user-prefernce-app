import { authAjax } from "./authAjax.js";

export async function loadProfileImage() {
  try {
    const response = await authAjax("http://127.0.0.1:8000/api/profile/image/");
    const data = await response.json();
    // console.log("Profile image data:", data);
    const imageUrl = data.image_url;
    // console.log("Image URL:", imageUrl);

    $$("profileImage").setHTML(
      `<div style='text-align:center'><img src='${imageUrl || "../../assets/images/default-profile-img.png" }' style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
    );
    $$("userAvatarBlock").setHTML(`
      <div style="text-align: center; padding: 2vh;">
        <img src="${data.image_url}" 
            style="max-width: 200px; height: 200px; border-radius: 50%; object-fit: cover;" />
        <h3 style="margin-top: 1vh;">Greetings!</h3>
        <p style="color: #888;">Welcome back to your dashboard</p>
      </div>
    `);
    $$("userAvatarBlock2").setHTML(`
      <div class='avatar-wrapper'>
        <img src="${data.image_url}"
            style="max-width: 45px; height: 45px; border-radius: 50%; object-fit: cover;"/>
        <span class='webix_icon mdi mdi-circle status green'></span>
      </div>
    `);
  } catch (e) {
    console.error("Error loading profile image:", e);
    $$("profileImage").setHTML(
      `<div style='text-align:center'><img src={'../../assets/images/default-profile-img.png' } style='width:100%;max-width:200px;height:auto;border-radius:50%;' /></div>`
    );
  }
}
