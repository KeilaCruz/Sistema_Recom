/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {
      colors: {
        colorMain: "#152034",
        colorFondo: "#F4F1ED",
        colorSecundario: "#3B315F",
        colorDisabled: "rgba(255,255,255,0.2)",
        hoverButtonAceptar: "#0D1422",

      },
    },
  },
  
};
