export function applyThemeSettings(settings) {
  if (!settings) return;

  document.documentElement.style.setProperty("--primary-color", settings.primary_color);
  document.documentElement.style.setProperty("--secondary-color", settings.secondary_color);
  document.documentElement.style.setProperty("--background-color", settings.background_color);
  document.documentElement.style.setProperty("--font-family", settings.font_family);
  document.documentElement.style.setProperty("--font-size", settings.font_size);
  document.documentElement.style.setProperty("--primary-font-color", settings.primary_font_color);
  document.documentElement.style.setProperty("--secondary-font-color", settings.secondary_font_color);

  document.body.classList.toggle("dark-theme", !!settings.dark_mode);
  document.body.classList.toggle("custom-theme", !!settings.Custom_mode);
}

export function luminance(r, g, b) {
    let a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrast(hex1, hex2) {
    function hexToRGB(hex) {
        let r = parseInt(hex.substr(1, 2), 16);
        let g = parseInt(hex.substr(3, 2), 16);
        let b = parseInt(hex.substr(5, 2), 16);
        return [r, g, b];
    }
    let lum1 = luminance(...hexToRGB(hex1));
    let lum2 = luminance(...hexToRGB(hex2));
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
