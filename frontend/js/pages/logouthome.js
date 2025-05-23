export const logouthomePage = {
  id: "logouthomePage",
  view: "template",
  
  template: `
    <div style="text-align: center; align-items: center; justify-content: center; padding: 5vh;">
      <h2>Welcome to the App</h2>
      <p>Please log in to access your dashboard and settings.</p>
      <button onclick="$$('loginWindow').show()" style="margin-top: 20px;">Login</button>
    </div>
  `
};
