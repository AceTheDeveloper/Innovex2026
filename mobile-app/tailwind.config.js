/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ─── Primary Ramp (Navy → Sky Blue) ───────────────────────
        navy: {
          950: "#0D1F4E", // primary brand, headers, nav bar, CTAs
          900: "#152D60", // dark surfaces, nav bg tint
          800: "#1A3472", // header blobs, card bg on dark
          700: "#243F82", // subtle navy accent
          600: "#2E4F8A", // borders on dark backgrounds
          500: "#3D5EA0", // muted icons on dark
          400: "#4A6BAA", // secondary icons on dark
        },
        blue: {
          DEFAULT: "#4A7BE0", // interactive elements, links, active states
          light: "#6FA3F8",   // hover states, soft accents
          pale:  "#E6F1FB",   // info backgrounds, chip fills
          muted: "#85B7EB",   // softer interactive
        },
        sky: {
          DEFAULT: "#6FBFFF", // AI features, highlights, dark bg accents
          dark:   "#378ADD",  // sky pressed state
        },

        // ─── Neutrals & Surface ───────────────────────────────────
        surface: {
          bg:      "#F4F5F9", // app background
          border:  "#E4E8F2", // card/input borders
          divider: "#D6DAE8", // dividers, phone frame
          muted:   "#9BA8C0", // placeholder text, muted icons
          secondary: "#6B7BA0", // secondary text, captions
          primary: "#0D1F4E", // primary text (reuse navy-950)
        },

        // ─── Semantic ─────────────────────────────────────────────
        success: {
          DEFAULT: "#22C98A", // success state, match confirmed, hired
          bg:      "#E1F5EE", // success backgrounds
          dark:    "#0F6E56", // success text on light bg
        },
        alert: {
          DEFAULT: "#E8526A", // alerts, notifications, overdue, urgent
          bg:      "#FCEEF0", // alert backgrounds
        },
        warning: {
          DEFAULT: "#F5A623", // warnings, deadlines
          bg:      "#FAEEDA", // warning backgrounds
          dark:    "#854F0B", // warning text on light bg
        },

        // ─── AI Accent ────────────────────────────────────────────
        ai: {
          DEFAULT: "#7F77DD", // AI badges, match scores, smart tags
          light:   "#EEEDFE", // AI feature backgrounds
          dark:    "#534AB7", // AI text on light bg
        },

        // ─── Job Type Tag Colors ──────────────────────────────────
        tag: {
          green:  { bg: "#E1F5EE", text: "#0F6E56" },
          blue:   { bg: "#E6F1FB", text: "#185FA5" },
          orange: { bg: "#FAEEDA", text: "#854F0B" },
          purple: { bg: "#EEEDFE", text: "#534AB7" },
          teal:   { bg: "#E1F5EE", text: "#1D9E75" },
          rose:   { bg: "#FBEAF0", text: "#993556" },
        },
      },

      fontFamily: {
        'figtree': ['Figtree_400Regular'],
        'figtree-medium': ['Figtree_500Medium'],
        'figtree-bold': ['Figtree_700Bold'],
        'figtree-extrabold': ['Figtree_800ExtraBold'],
      },
      
      fontSize: {
        "2xs": ["9px",  { lineHeight: "13px" }],
        xs:    ["10px", { lineHeight: "14px" }],
        sm:    ["11px", { lineHeight: "16px" }],
        base:  ["12px", { lineHeight: "18px" }],
        md:    ["13px", { lineHeight: "20px" }],
        lg:    ["14px", { lineHeight: "22px" }],
        xl:    ["16px", { lineHeight: "24px" }],
        "2xl": ["18px", { lineHeight: "26px" }],
        "3xl": ["20px", { lineHeight: "28px" }],
        "4xl": ["22px", { lineHeight: "30px" }],
        "5xl": ["26px", { lineHeight: "34px" }],
      },

      borderRadius: {
        none: "0px",
        sm:   "6px",
        md:   "8px",
        lg:   "10px",
        xl:   "12px",
        "2xl":"14px",
        "3xl":"16px",
        "4xl":"20px",
        full: "9999px",
      },

      spacing: {
        // base-4 scale with mobile-friendly touch targets
        0:    "0px",
        0.5:  "2px",
        1:    "4px",
        1.5:  "6px",
        2:    "8px",
        2.5:  "10px",
        3:    "12px",
        3.5:  "14px",
        4:    "16px",
        5:    "20px",
        6:    "24px",
        7:    "28px",
        8:    "32px",
        9:    "36px",
        10:   "40px",
        11:   "44px", // minimum tap target
        12:   "48px",
        14:   "56px",
        16:   "64px",
        20:   "80px",
        24:   "96px",
        28:   "112px",
        32:   "128px",
      },

      letterSpacing: {
        tightest: "-0.5px",
        tighter:  "-0.3px",
        tight:    "-0.2px",
        normal:   "0px",
        wide:     "0.2px",
        wider:    "0.4px",
        widest:   "1.4px",
        label:    "1.2px",
      },

      lineHeight: {
        none:    "1",
        tight:   "1.1",
        snug:    "1.2",
        normal:  "1.4",
        relaxed: "1.5",
        loose:   "1.6",
      },


    },
  },
  plugins: [],
};