module.exports = {
   env: {
      node: true,
   },
   plugins: [
      "@typescript-eslint"
   ],
   parser: "@typescript-eslint/parser",
   extends: [
      "eslint:recommended", "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended", "prettier"
   ],
   rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
   },
};
