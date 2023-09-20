/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      extend: {
        spacing :{
          "100" :"30rem"
        },
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
          'text-shadow': '0 0 5px rgba(0, 0, 0, 0.5)', 
        },
        backdropBlur :{
          xs : "2px"
        },
        colors :{
          "customcolor" : "f0f0f0"
        },
        
      
  
      }
    },
  },
  plugins: [],
}

