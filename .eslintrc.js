module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/require-component-is': 'off',
    'vue/npo-v-html': 'off',
    'vue/comment-direct': 0,
    'nuxt/no-cjs-in-config': 'off'
  },
}
