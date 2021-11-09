require('dotenv').config();

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sveltePreprocess = require('svelte-preprocess');
const sass = require('sass');

const {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_ID,
  FIREBASE_APP_ID,
} = process.env;

const isDev = (mode) => mode === 'development';
const isProd = (mode) => mode === 'production';

module.exports = {
  generatePreprocessBlock: (mode) =>
    sveltePreprocess({
      postcss: {
        plugins: [autoprefixer].concat(isProd(mode) ? [cssnano] : []),
      },
      typescript: {
        tsconfigFile: './tsconfig.json',
      },
      scss: {
        renderSync: true,
        implementation: sass,
      },
      replace: [
        ['FIREBASE_API_KEY', JSON.stringify(FIREBASE_API_KEY)],
        ['FIREBASE_PROJECT_ID', JSON.stringify(FIREBASE_PROJECT_ID)],
        ['FIREBASE_MESSAGING_ID', JSON.stringify(FIREBASE_MESSAGING_ID)],
        ['FIREBASE_APP_ID', JSON.stringify(FIREBASE_APP_ID)],
      ],
    }),
};
