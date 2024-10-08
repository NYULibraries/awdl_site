import WebFont from 'webfontloader';

const loadFonts = (): void => {
  WebFont.load({
    google: {
      families: ['Open Sans:400,700'], // Adjust fonts as needed
    },
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadFonts();
});
