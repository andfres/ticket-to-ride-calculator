<template>
	<div class="input-vagon-row">
		<div class="vagon-info">
			<span class="vagon-label">{{ label }}</span>
			<span class="vagon-points">({{ vagon.puntos }} pts)</span>
		</div>

		<div class="vagon-controls">
			<button class="btn-ctrl" @click="disminuir" :aria-label="t('player.objetivos.remove')">
				−
			</button>
			<div class="vagon-count">{{ vagon.cantidad }}</div>
			<button class="btn-ctrl" @click="aumentar" :aria-label="t('player.objetivos.add')">
				+
			</button>
		</div>

		<div class="vagon-total">{{ vagon.puntosTotales }}</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { addVagon, quitarVagon } = useStore();

const props = defineProps({
	vagon: Object,
	jugadorId: Number,
});

const max = computed(() => {
	if (props.vagon.num_vagones >= 8) {
		return 2;
	} else {
		return 25;
	}
});

const label = computed(() => {
	if (props.vagon.num_vagones === 1) return t("player.vagon_1");
	return t("player.vagon_n", { n: props.vagon.num_vagones });
});

const aumentar = () => {
	if (props.vagon.cantidad < max.value) {
		addVagon(props.jugadorId, props.vagon.id);
	}
};

const disminuir = () => {
	if (props.vagon.cantidad >= 1) {
		quitarVagon(props.jugadorId, props.vagon.id);
	}
};
</script>

<style lang="scss" scoped>
.input-vagon-row {
	display: grid;
	grid-template-columns: 1fr auto 40px;
	align-items: center;
	gap: 1rem;
	padding: 0.5rem;
	background: rgba(255, 255, 255, 0.02);
	border-radius: var(--radius-sm);
	border: 1px solid var(--color-border);

	.vagon-info {
		display: flex;
		flex-direction: column;
		
		.vagon-label {
			font-size: 0.9rem;
			font-weight: 500;
			color: var(--color-text-soft);
		}
		
		.vagon-points {
			font-size: 0.75rem;
			color: var(--color-text-mute);
		}
	}

	.vagon-controls {
		display: flex;
		align-items: center;
		background: var(--color-bg-soft);
		border-radius: 999px;
		padding: 2px;
		border: 1px solid var(--color-border);

		.btn-ctrl {
			width: 28px;
			height: 28px;
			border-radius: 50%;
			border: none;
			background: transparent;
			color: var(--color-text);
			font-size: 1.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&:hover {
				background: var(--color-accent-soft);
				color: var(--color-accent);
			}
			
			&:active {
				transform: scale(0.9);
			}
		}

		.vagon-count {
			width: 30px;
			text-align: center;
			font-weight: 600;
			font-size: 1rem;
		}
	}

	.vagon-total {
		text-align: right;
		font-weight: 700;
		font-family: "Neucha", cursive;
		font-size: 1.2rem;
		color: var(--color-accent);
	}
}
</style>
