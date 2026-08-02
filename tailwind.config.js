/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-primary": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-bright": "#fcf9f8",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed": "#1b1c17",
        "surface-container-lowest": "#ffffff",
        "secondary": "#645e4c",
        "on-error": "#ffffff",
        "surface-dim": "#dcd9d9",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#271816",
        "primary": "#6f5957",
        "on-tertiary-container": "#62625c",
        "on-surface": "#1c1b1b",
        "surface": "#fcf9f8",
        "primary-container": "#f4d7d4",
        "background": "#fcf9f8",
        "surface-tint": "#6f5957",
        "secondary-fixed-dim": "#cfc6b0",
        "on-primary-container": "#725c5a",
        "surface-variant": "#e5e2e1",
        "tertiary-fixed-dim": "#c8c7bf",
        "on-surface-variant": "#4f4443",
        "surface-container-highest": "#e5e2e1",
        "on-primary-fixed-variant": "#564240",
        "outline": "#817473",
        "tertiary": "#5f5f59",
        "outline-variant": "#d2c3c1",
        "inverse-on-surface": "#f3f0ef",
        "tertiary-fixed": "#e4e3db",
        "primary-fixed": "#f9dcd9",
        "secondary-fixed": "#ece2cb",
        "tertiary-container": "#dfded6",
        "on-secondary-container": "#6b6452",
        "secondary-container": "#ece2cb",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#4c4636",
        "error": "#ba1a1a",
        "inverse-surface": "#313030",
        "surface-container-high": "#eae7e7",
        "on-tertiary-fixed-variant": "#474742",
        "surface-container": "#f0eded",
        "on-secondary-fixed": "#201b0d",
        "primary-fixed-dim": "#dcc0bd",
        "on-tertiary": "#ffffff",
        "on-background": "#1c1b1b",
        "inverse-primary": "#dcc0bd"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "unit": "8px",
        "margin-desktop": "64px",
        "container-max": "1440px",
        "margin-mobile": "20px",
        "gutter": "24px",
        "section-gap": "120px"
      },
      "fontFamily": {
        "headline-md": ["Playfair Display", "serif"],
        "body-md": ["DM Sans", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "display-lg": ["Playfair Display", "serif"],
        "body-lg": ["DM Sans", "sans-serif"],
        "headline-lg-mobile": ["Playfair Display", "serif"],
        "label-sm": ["DM Sans", "sans-serif"]
      },
      "fontSize": {
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "headline-lg": ["40px", {"lineHeight": "48px", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-lg-mobile": ["32px", {"lineHeight": "40px", "fontWeight": "400"}],
        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
