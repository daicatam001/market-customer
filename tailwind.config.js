module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#4F4D8C",
        "primary-2": "#048ABF",
        "primary-3": "#F27F3D",
        "primary-4": "#F25A38",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
