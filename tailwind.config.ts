import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nayab Seeds palette — soil, leaf, seed-husk, not a generic SaaS palette
        soil: "#2E2318",
        leaf: "#3F6C40",
        husk: "#C9A24B",
        cream: "#F7F2E7",
        clay: "#A9612F",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
