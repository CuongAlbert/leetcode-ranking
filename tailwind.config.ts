import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: {
          150: "#F7F8FA",
          250: "#F0F0F0",
          350: "#dedede",
          450: "#9a9b9d",
          550: "#8A8A8E",
          650: "#3D3D3D",
          750: "#2A2A2A",
          850: "#1A1A1A",
        },
        copper: "#b87333",
      },
    },
  },
  plugins: [],
};
export default config;
