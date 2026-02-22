<template>
	<div class="input-modern-row">
		<div class="label-info">
			<span class="title">{{ $t("player.europe.stations") }}</span>
			<span class="subtitle">{{ $t("player.europe.stations_subtitle") }}</span>
		</div>

		<div class="controls">
			<button class="btn-round" @click="disminuir" aria-label="Menos">-</button>
			<div class="current-value">{{ props.jugador.cantidadEstaciones }}</div>
			<button class="btn-round" @click="aumentar" aria-label="Más">+</button>
		</div>

		<div class="points-badge">{{ jugador.puntosEstaciones }}</div>
	</div>
</template>

<script setup>
import { useStore } from "@/stores/store";

const store = useStore();
const { disminuirEstaciones, aumentarEstaciones } = store;

const props = defineProps({
	jugador: Object,
});

const max = 3;

const disminuir = () => {
	if (props.jugador.cantidadEstaciones >= 1) {
		disminuirEstaciones(props.jugador.id);
	}
};

const aumentar = () => {
	if (props.jugador.cantidadEstaciones < max) {
		aumentarEstaciones(props.jugador.id);
	}
};
</script>

<style lang="scss" scoped>
.input-modern-row {
	display: grid;
	grid-template-columns: 1fr auto 40px;
	align-items: center;
	gap: 1rem;
	padding: 0.75rem;
	margin-bottom: 0.5rem;
	border-radius: var(--radius-md);
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid var(--color-border);

	.label-info {
		display: flex;
		flex-direction: column;

		.title {
			font-weight: 600;
			font-size: 0.95rem;
		}

		.subtitle {
			font-size: 0.75rem;
			color: var(--color-text-mute);
		}
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-bg-soft);
		border-radius: 999px;
		padding: 3px;

		.btn-round {
			width: 26px;
			height: 26px;
			border-radius: 50%;
			border: none;
			background: var(--color-bg-mute);
			color: var(--color-text);
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				background: var(--color-accent);
				color: var(--color-bg);
			}
		}

		.current-value {
			width: 25px;
			text-align: center;
			font-weight: 700;
		}
	}

	.points-badge {
		text-align: right;
		font-family: "Neucha", cursive;
		font-weight: 700;
		font-size: 1.2rem;
		color: #ef4444; /* Rojo para resta de puntos */
	}
}
</style>
