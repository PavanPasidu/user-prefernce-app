export const logouthomePage = {
  id: "logouthomePage",
  view: "template",
  
  template: `

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh; text-align: center;">
      <h1 style="font-size: 4rem; margin-bottom: 1rem;">Welcome to the App</h1>
      <p>Please log in to access your dashboard and settings.</p>
      <button onclick="$$('loginWindow').show()" style="margin-top: 30px; font-size: 1.2rem; padding: 15px 40px; border-radius: 8px; cursor: pointer;">Login</button>
    </div>
  `
};
