<template>
	<div class="language-switcher glass">
		<button 
			v-for="lang in ['es', 'en']" 
			:key="lang"
			:class="['lang-btn', { active: locale === lang }]"
			@click="locale = lang"
		>
			{{ lang.toUpperCase() }}
		</button>
	</div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
</script>

<style lang="scss" scoped>
.language-switcher {
	display: flex;
	padding: 4px;
	border-radius: 999px;
	gap: 4px;
	background: rgba(255, 255, 255, 0.05);

	.lang-btn {
		background: transparent;
		border: none;
		color: var(--color-text-mute);
		font-size: 0.75rem;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: 999px;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			color: var(--color-text);
		}

		&.active {
			background: var(--color-accent);
			color: var(--color-bg);
		}
	}
}
</style>
