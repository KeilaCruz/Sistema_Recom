/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorMain: "#152034",
        colorFondo: "#F4F1ED",
        colorSecundario: "#3B315F",
        colorHover: "rgba(255,255,255,0.2)",
        colorBotonCancelar: "",
      },
    },
  },
  plugins: [],
}

