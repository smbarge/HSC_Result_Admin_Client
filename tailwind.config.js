const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
         50: '#f1f9fa',
        100: '#dcf0f1',
        200: '#bde2e4',
        300: '#90cbd0',
        400: '#51a8b1',
        500: '#3f919b',
        600: '#377783',
        700: '#32616c',
        800: '#30525a',
        900: '#2b454e',
        950: '#192d33'
        }
      }
    }
  }
};

module.exports = config;