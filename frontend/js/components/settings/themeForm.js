import { luminance, getContrast } from "../../utils/themeManage.js";

function applyThemeSettings(settings) {
    document.body.style.setProperty("--primary-color", settings.primary_color);
    document.body.style.setProperty("--secondary-color", settings.secondary_color);
    document.body.style.setProperty("--background-color", settings.background_color);
    document.body.style.setProperty("--primary-font-color", settings.primary_font_color);
    document.body.style.setProperty("--secondary-font-color", settings.secondary_font_color);
    document.body.style.setProperty("--font-family", settings.font_family);
    document.body.style.setProperty("--font-size", settings.font_size);

    document.body.classList.toggle("custom-theme", settings.Custom_mode === 1);
    document.body.classList.toggle("dark-theme", settings.dark_mode === 1);
}

function fetchThemeSettings() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const token = loggedUser.access;
                
    return webix.ajax().headers({"Authorization": `Bearer ${token}`}).get("http://127.0.0.1:8000/api/theme-settings/").then((res) => {
        if (res.json().success) {
            return res.json().data;
        }
        return null;
    });
}

function saveThemeSettings(data) {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const token = loggedUser.access;

    return webix.ajax().headers({"Authorization": `Bearer ${token}`}).post("http://127.0.0.1:8000/api/theme-settings/", data).then((res) => {
        return res.json();
    });
}

export const themeForm = {
    id: "themeForm",
    view: "scrollview",
    scroll: "y",
    responsive: true,
    body: {
        rows: [
            {
                template: "<div role='heading' aria-level='2' tabindex='0'><h2>Theme Customization</h2></div>",
                height: 50,
                css: "theme-settings-header",
            },
            {
                template:
                    "<div style='padding: 10px 10px 15px 10px; font-size: 14px; color: #555;'>Customize the look and feel of the application, including colors, fonts, and layout preferences.</div>",
                height: 30,
                css: "theme-subheader",
            },
            {
                view: "form",
                id: "color-settings",
                borderless: true,
                rows: [
                    {
                        template: "<h3>Color Settings</h3>",
                        height: 40,
                        css: "settings-section-header",
                    },
                    {
                        view: "colorpicker",
                        label: "Primary Color",
                        name: "primary_color",
                        labelPosition: "top",
                        value: "#3498db",
                        attributes: { "aria-label": "Primary color for the theme" },
                    },
                    {
                        view: "colorpicker",
                        label: "Secondary Color",
                        name: "secondary_color",
                        labelPosition: "top",
                        value: "#2ecc71",
                    },
                    {
                        view: "colorpicker",
                        label: "Background Color",
                        name: "background_color",
                        labelPosition: "top",
                        value: "#ffffff",
                    },
                ],
            },
            {
                view: "form",
                id: "font-settings",
                borderless: true,
                rows: [
                    {
                        template: "<h3>Font Settings</h3>",
                        height: 40,
                        css: "settings-section-header",
                    },
                    {
                        view: "select",
                        label: "Font Family",
                        name: "font_family",
                        labelPosition: "top",
                        value: "Arial",
                        options: [
                            { id: "Arial", value: "Arial" },
                            { id: "Helvetica", value: "Helvetica" },
                            { id: "Times New Roman", value: "Times New Roman" },
                            { id: "Courier New", value: "Courier New" },
                            { id: "Verdana", value: "Verdana" },
                        ],
                    },
                    {
                        view: "select",
                        label: "Font Size",
                        name: "font_size",
                        labelPosition: "top",
                        value: "14px",
                        options: [
                            { id: "12px", value: "12 px" },
                            { id: "14px", value: "14 px" },
                            { id: "16px", value: "16 px" },
                            { id: "18px", value: "18 px" },
                            { id: "20px", value: "20 px" },
                        ],
                    },
                    {
                        view: "colorpicker",
                        label: "Primary Font Color",
                        name: "primary_font_color",
                        labelPosition: "top",
                        value: "#ffffff",
                    },
                    {
                        view: "colorpicker",
                        label: "Secondary Font Color",
                        name: "secondary_font_color",
                        labelPosition: "top",
                        value: "#ffffff",
                    },
                ],
            },
            {
                view: "form",
                id: "layout-settings",
                borderless: true,
                rows: [
                    {
                        template: "<h3>Layout Settings</h3>",
                        height: 40,
                        css: "settings-section-header",
                    },
                    {
                        view: "select",
                        label: "Layout Style",
                        name: "layout_style",
                        labelPosition: "top",
                        value: "compact",
                        options: [
                            { id: "compact", value: "Compact" },
                            { id: "comfortable", value: "Comfortable" },
                            { id: "spacious", value: "Spacious" },
                        ],
                    },
                    {
                        cols: [
                            {
                                view: "checkbox",
                                labelRight: "Enable dark mode",
                                name: "dark_mode",
                                value: 0,
                                attributes: {
                                    "aria-label": "Enable dark mode for personalized themes",
                                },
                                on: {
                                    onChange: function (val) {
                                        if (val) {
                                            $$("layout-settings")
                                                .queryView({ name: "Custom_mode" })
                                                .setValue(0);
                                        }
                                    },
                                },
                            },
                            {
                                view: "checkbox",
                                labelRight: "Enable custom mode",
                                name: "Custom_mode",
                                value: 0,
                                attributes: {
                                    "aria-label": "Enable custom mode for personalized themes",
                                },
                                on: {
                                    onChange: function (val) {
                                        if (val) {
                                            $$("layout-settings")
                                                .queryView({ name: "dark_mode" })
                                                .setValue(0);
                                        }
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            {
                cols: [
                    { gravity: 1 },
                    {
                        view: "button",
                        value: "Apply Changes",
                        css: "webix_primary",
                        click: async function () {
                            const colorForm = $$("color-settings");
                            const fontForm = $$("font-settings");
                            const layoutForm = $$("layout-settings");

                            const colorValues = colorForm.getValues();
                            const fontValues = fontForm.getValues();
                            const layoutValues = layoutForm.getValues();

                            const allValues = {
                                ...colorValues,
                                ...fontValues,
                                ...layoutValues,
                            };

                            const primaryContrast = getContrast(
                                allValues.primary_font_color,
                                allValues.background_color
                            );
                            const secondaryContrast = getContrast(
                                allValues.secondary_font_color,
                                allValues.background_color
                            );
                            const primeContrast = getContrast(
                                allValues.primary_color,
                                allValues.background_color
                            );

                            if (primaryContrast < 4.5) {
                                webix.message({
                                    type: "error",
                                    text: "Insufficient contrast between primary font color and background!",
                                });
                                return;
                            }

                            if (secondaryContrast < 4.5) {
                                webix.message({
                                    type: "error",
                                    text: "Insufficient contrast between secondary font color and background!",
                                });
                                return;
                            }

                            if (primeContrast < 3.5) {
                                webix.message({
                                    type: "error",
                                    text: "Insufficient contrast between primary color and background!",
                                });
                                return;
                            }

                            applyThemeSettings(allValues);

                            // Save to backend
                            const saveRes = await saveThemeSettings(allValues);
                            if (saveRes.success) {
                                webix.message({
                                    type: "success",
                                    text: "Theme settings saved and applied!",
                                });
                            } else {
                                webix.message({
                                    type: "error",
                                    text: "Failed to save theme settings!.",
                                });
                            }
                        },
                    },
                    {
                        view: "button",
                        value: "Reset to Default",
                        css: "webix_secondary",
                        click: function () {
                            const defaults = {
                                primary_color: "#2c3e50",
                                secondary_color: "#4a476d",
                                background_color: "#3f3f3f",
                                font_family: "Arial",
                                font_size: "14px",
                                primary_font_color: "#ffffff",
                                secondary_font_color: "#ffffff",
                                layout_style: "compact",
                                dark_mode: 0,
                                Custom_mode: 0,
                            };
                            $$("color-settings").setValues({
                                primary_color: defaults.primary_color,
                                secondary_color: defaults.secondary_color,
                                background_color: defaults.background_color,
                            });
                            $$("font-settings").setValues({
                                font_family: defaults.font_family,
                                font_size: defaults.font_size,
                                primary_font_color: defaults.primary_font_color,
                                secondary_font_color: defaults.secondary_font_color,
                            });
                            $$("layout-settings").setValues({
                                layout_style: defaults.layout_style,
                                dark_mode: defaults.dark_mode,
                                Custom_mode: defaults.Custom_mode,
                            });

                            localStorage.removeItem("themeSettings");
                            applyThemeSettings(defaults);

                            // Optionally save default settings to backend
                            saveThemeSettings(defaults).then(() => {
                                webix.message({
                                    type: "success",
                                    text: "Theme settings reset to default!",
                                });
                            });
                        },
                    },
                    { gravity: 1 },
                ],
            },
        ],
    },
    on: {
        onViewShow: async function () {
            // Load saved settings from backend on view show
            const savedSettings = await fetchThemeSettings();
            if (savedSettings) {
                $$("color-settings").setValues({
                    primary_color: savedSettings.primary_color,
                    secondary_color: savedSettings.secondary_color,
                    background_color: savedSettings.background_color,
                });
                $$("font-settings").setValues({
                    font_family: savedSettings.font_family,
                    font_size: savedSettings.font_size,
                    primary_font_color: savedSettings.primary_font_color,
                    secondary_font_color: savedSettings.secondary_font_color,
                });
                $$("layout-settings").setValues({
                    layout_style: savedSettings.layout_style,
                    dark_mode: savedSettings.dark_mode,
                    Custom_mode: savedSettings.Custom_mode,
                });

                applyThemeSettings(savedSettings);
            }
        },
    },

};
