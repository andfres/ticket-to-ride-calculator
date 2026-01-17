import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	js.configs.recommended,
	...pluginVue.configs["flat/essential"],
	prettierRecommended,
	{
		rules: {
			"no-console": "off",
			"no-debugger": "off",
		},
	},
];
