import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	js.configs.recommended,
	...pluginVue.configs["flat/essential"],
	prettierRecommended,
	{
		languageOptions: {
			globals: {
				localStorage: "readonly",
				confirm: "readonly",
				alert: "readonly",
			},
		},
		rules: {
			"no-console": "off",
			"no-debugger": "off",
		},
	},
];
