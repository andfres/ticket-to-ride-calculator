<template>
	<div class="objetivo-row">
		<label class="obj-label">{{ $t("player.objetivos.label", { n: objetivoId + 1 }) }}</label>
		<div class="obj-input-wrapper">
			<input 
				ref="input" 
				type="number" 
				:value="objetivoPuntos" 
				@input="actualizarPuntos" 
				placeholder="0"
			/>
			<span class="pts-unit">pts</span>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/store";
const { actualizarPuntosObjetivo } = useStore();

const props = defineProps({
	objetivoId: Number,
	objetivoPuntos: Number,
	jugador: Object,
});

const input = ref(null);

const actualizarPuntos = () => {
	const val = parseInt(input.value.value) || 0;
	actualizarPuntosObjetivo(props.jugador.id, props.objetivoId, val);
};
</script>

<style lang="scss" scoped>
.objetivo-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0.75rem;
	background: rgba(255, 255, 255, 0.02);
	border-radius: var(--radius-sm);
	border: 1px solid var(--color-border);

	.obj-label {
		font-family: "Neucha", cursive;
		font-size: 1.1rem;
		color: var(--color-text-soft);
	}

	.obj-input-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;

		input {
			width: 60px;
			text-align: center;
			font-weight: 700;
			background: var(--color-bg-mute);
			border-color: var(--color-border);
			padding: 4px 8px;

			&:focus {
				background: var(--color-bg-soft);
				border-color: var(--color-accent);
			}
		}

		.pts-unit {
			font-size: 0.8rem;
			color: var(--color-text-mute);
			font-weight: 600;
		}
	}
}
</style>
