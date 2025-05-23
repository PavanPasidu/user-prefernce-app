import { authAjax } from "../../utils/authAjax.js";

export const privacyForm = {
    id: "privacyForm",
    view: "scrollview",
    responsive: true,
    scroll: "y",
    body: {
        rows: [
            {
                template: "<h2>Privacy Settings</h2>",
                height: 50,
                css: "privacy-settings-header"
            },
            {
                template: "<div style='padding: 11px 10px 15px 10px; font-size: 14px; color: #555;'>Manage privacy preferences, including profile visibility and data sharing.</div>",
                height: 50,
                css: "privacy-subheader"
            },
            {
                view: "layout",
                responsive: true,
                type: "clean",
                cols: [
                    {
                        view: "form",
                        id: "profile-picture-settings",
                        borderless: true,
                        autoheight: true,
                        responsive: true,
                        gravity: 1,
                        rows: [
                            { template: "<h3>Profile Picture Settings</h3>", height: 40, css: "settings-section-header" },
                            {
                                view: "select",
                                label: "Profile Picture Visibility",
                                name: "profile_pic_visibility",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "everyone", value: "Everyone" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "private", value: "Only Me" }
                                ]
                            },
                            {
                                view: "select",
                                label: "Who can download or save your profile picture",
                                name: "profile_pic_download",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "no_one", value: "No One" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "everyone", value: "Everyone" }
                                ]
                            }
                        ]
                    },
                    {
                        view: "form",
                        id: "account-privacy",
                        borderless: true,
                        autoheight: true,
                        responsive: true,
                        gravity: 1,
                        rows: [
                            { template: "<h3>Account Privacy</h3>", height: 40, css: "settings-section-header" },
                            {
                                view: "select",
                                label: "Profile Visibility",
                                name: "account_privacy",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "public", value: "Public" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "private", value: "Only Me" }
                                ]
                            },
                            {
                                view: "select",
                                label: "Who can send you connection requests",
                                name: "connection_requests",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "everyone", value: "Everyone" },
                                    { id: "friends_of_friends", value: "Friends of Friends" },
                                    { id: "no_one", value: "No One" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                view: "layout",
                responsive: true,
                type: "clean",
                cols: [
                    {
                        view: "form",
                        id: "advanced-privacy-controls",
                        borderless: true,
                        autoheight: true,
                        responsive: true,
                        gravity: 1,
                        rows: [
                            { template: "<h3>Advanced Privacy Controls</h3>", height: 40, css: "settings-section-header" },
                            {
                                view: "select",
                                label: "Data Retention Period",
                                name: "data_retention",
                                labelPosition: "top",
                                value: "1_month",
                                options: [
                                    { id: "1_month", value: "1 Month" },
                                    { id: "3_months", value: "3 Months" },
                                    { id: "6_months", value: "6 Months" },
                                    { id: "1_year", value: "1 Year" },
                                    { id: "forever", value: "Forever" }
                                ]
                            },
                            {
                                view: "select",
                                label: "Data Export Options",
                                name: "data_export",
                                labelPosition: "top",
                                value: "full",
                                options: [
                                    { id: "full", value: "Full Export" },
                                    { id: "minimal", value: "Minimal Export" },
                                    { id: "no_export", value: "No Export" }
                                ]
                            }
                        ]
                    },
                    {
                        view: "form",
                        id: "data-sharing-preferences",
                        borderless: true,
                        autoheight: true,
                        responsive: true,
                        gravity: 1,
                        rows: [
                            { template: "<h3>Data Sharing Preferences</h3>", height: 40, css: "settings-section-header" },
                            {
                                view: "checkbox",
                                labelRight: "Allow search engines to index my profile",
                                name: "search_engine_visibility",
                                labelWidth: 0,
                                value: 0
                            },
                            {
                                view: "checkbox",
                                labelRight: "Allow third-party apps to access my data",
                                name: "third_party_access",
                                labelWidth: 0,
                                value: 0
                            },
                            {
                                view: "checkbox",
                                labelRight: "Show my active status",
                                name: "active_status_visibility",
                                labelWidth: 0,
                                value: 0
                            },
                            {
                                view: "checkbox",
                                labelRight: "Allow profile views tracking",
                                name: "profile_view_tracking",
                                labelWidth: 0,
                                value: 0
                            }
                        ]
                    }
                ]
            },
            {
                view: "form",
                id: "consent-legal-settings",
                borderless: true,
                autoheight: true,
                responsive: true,
                rows: [
                    { template: "<h3>Consent & Legal</h3>", height: 40, css: "settings-section-header" },
                    {
                        view: "checkbox",
                        labelRight: "I accept the Terms of Service",
                        name: "accept_tos",
                        value: 1
                    },
                    {
                        view: "checkbox",
                        labelRight: "I accept the Privacy Policy",
                        name: "accept_privacy_policy",
                        value: 1
                    },
                    {
                        view: "button",
                        value: "Download Privacy Policy",
                        click: () => webix.message("Privacy Policy download started")
                    },
                    {
                        view: "button",
                        value: "Download Terms of Service",
                        click: () => webix.message("Terms of Service download started")
                    }
                ]
            },
            {
                view: "layout",
                responsive: true,
                cols: [
                    { gravity: 1 },
                    {
                        view: "button",
                        value: "Save Changes",
                        css: "webix_primary",
                        width: 160,
                        click: savePrivacySettings
                    },
                    {
                        view: "button",
                        value: "Reset to Default",
                        css: "webix_secondary",
                        width: 160,
                        click: resetPrivacySettings
                    },
                    { gravity: 1 }
                ]
            }
        ]
    },
    on: {
        onViewShow: function() {
            loadPrivacySettings();
        }
    }
};

function savePrivacySettings() {
    webix.confirm({
        title: "Save Privacy Settings",
        text: "Are you sure you want to save these privacy settings?",
        callback: function (result) {
            if (result) {
                const data = {
                    ...$$("profile-picture-settings").getValues(),
                    ...$$("account-privacy").getValues(),
                    ...$$("advanced-privacy-controls").getValues(),
                    ...$$("data-sharing-preferences").getValues(),
                    ...$$("consent-legal-settings").getValues()
                };

                // const token = localStorage.getItem("token");
                const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
                const token = loggedUser.access;
                authAjax("http://127.0.0.1:8000/api/save-privacy-settings/", "POST", data)
                .then(() => {
                    webix.message({
                        type: "success",
                        text: "Privacy settings updated successfully!"
                    });
                })
                .catch(() => {
                    webix.message({
                        type: "error",
                        text: "Failed to update privacy settings."
                    });
                });
            }
        }
    });
}

function resetPrivacySettings() {
    webix.confirm({
        title: "Reset Settings",
        text: "Are you sure you want to reset all privacy settings to default?",
        callback: function (result) {
            if (result) {
                $$("profile-picture-settings").setValues({
                    profile_pic_visibility: "everyone",
                    profile_pic_download: "everyone"
                });
                $$("account-privacy").setValues({
                    account_privacy: "public",
                    connection_requests: "everyone"
                });
                $$("data-sharing-preferences").setValues({
                    search_engine_visibility: 0,
                    third_party_access: 0,
                    active_status_visibility: 0,
                    profile_view_tracking: 0
                });
                $$("advanced-privacy-controls").setValues({
                    data_retention: "1_month",
                    data_export: "full"
                });
                $$("consent-legal-settings").setValues({
                    accept_tos: 1,
                    accept_privacy_policy: 1
                });

                webix.message({
                    type: "success",
                    text: "Privacy settings reset to default!"
                });
            }
        }
    });
}

function loadPrivacySettings() {
    authAjax("http://127.0.0.1:8000/api/get-privacy-settings/", "GET")
        .then((response) => {
            const settings = response.json();

            if (Object.keys(settings).length === 0) {
                // Optionally reset to defaults or leave forms empty
                return;
            }

            $$("profile-picture-settings").setValues({
                profile_pic_visibility: settings.profile_pic_visibility || "everyone",
                profile_pic_download: settings.profile_pic_download || "everyone"
            });

            $$("account-privacy").setValues({
                account_privacy: settings.account_privacy || "public",
                connection_requests: settings.connection_requests || "everyone"
            });

            $$("advanced-privacy-controls").setValues({
                data_retention: settings.data_retention || "1_month",
                data_export: settings.data_export || "full"
            });

            $$("data-sharing-preferences").setValues({
                search_engine_visibility: settings.search_engine_visibility || 0,
                third_party_access: settings.third_party_access || 0,
                active_status_visibility: settings.active_status_visibility || 0,
                profile_view_tracking: settings.profile_view_tracking || 0
            });

            $$("consent-legal-settings").setValues({
                accept_tos: settings.accept_tos || 1,
                accept_privacy_policy: settings.accept_privacy_policy || 1
            });
        })
        .catch(() => {
            webix.message({
                type: "error",
                text: "Failed to load privacy settings."
            });
        });
}