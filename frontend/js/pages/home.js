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
          template: `
            <div style="text-align: center; padding: 2vh;">
              <img src="./assets/images/pavan.jpeg" 
                   style="max-width: 30%; height: auto; border-radius: 50%; object-fit: cover;" />
              <h3 style="margin-top: 1vh;">Greetings!</h3>
              <p style="color: #888;">Welcome back to your dashboard</p>
            </div>
          `
        },
        {
          view: "template",
          css: "about-me-block",
          template: `
            <div style="padding: 2vh;">
              <h4>About Me</h4>
              <p>This section contains user details, preferences summary, and quick access options. You can fetch this from the backend and update it dynamically.</p>
            </div>
          `
        }
      ]
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
      `
    }
  ]
};
