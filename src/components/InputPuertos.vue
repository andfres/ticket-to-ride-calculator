<template>
	<div class="input-puertos-container">
		<header class="seccion-header">
			<h3>Puertos</h3>
			<span class="info-tag">(-4 si no construido)</span>
		</header>

		<div class="puertos-list">
			<div v-for="(puerto, index) in jugador.puertos" :key="index" class="puerto-card-mini">
				<div class="puerto-main">
					<label class="checkbox-custom">
						<input
							type="checkbox"
							:checked="puerto.construido"
							@change="store.togglePortBuilt(jugador.id, index)"
						/>
						<span class="checkmark"></span>
						P{{ index + 1 }}
					</label>

					<div v-if="puerto.construido" class="tickets-counter">
						<button
							class="btn-mini"
							@click="store.updatePortTickets(jugador.id, index, puerto.tickets - 1)"
							:disabled="puerto.tickets <= 1"
						>
							−
						</button>
						<span class="counter-val">{{ puerto.tickets }}</span>
						<button
							class="btn-mini"
							@click="store.updatePortTickets(jugador.id, index, puerto.tickets + 1)"
						>
							+
						</button>
						<span class="counter-label">tickets</span>
					</div>
				</div>
				<div :class="['puerto-badge', { built: puerto.construido }]">
					{{ calcularPuntosPuerto(puerto) }} pts
				</div>
			</div>
		</div>

		<footer class="puertos-footer">
			<span>Subtotal Puertos</span>
			<span class="value">{{ jugador.puntosPuertos }} pts</span>
		</footer>
	</div>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { gameMode } = storeToRefs(store);

defineProps({
	jugador: Object,
});

const calcularPuntosPuerto = (puerto) => {
	if (!puerto.construido) return -4;
	const scoring = gameMode.value === "vuelta-del-mundo" ? [0, 20, 30, 40] : [0, 10, 20, 30];
	const ticketPointsIdx = Math.min(puerto.tickets, 3);
	return scoring[ticketPointsIdx];
};
</script>

<style lang="scss" scoped>
.input-puertos-container {
	background: rgba(255, 255, 255, 0.02);
	border-radius: var(--radius-md);
	padding: 1rem;
	border: 1px solid var(--color-border);

	.seccion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;

		h3 {
			font-size: 1.1rem;
			border: none;
			margin: 0;
			padding: 0;
		}

		.info-tag {
			font-size: 0.7rem;
			color: var(--color-text-mute);
			text-transform: uppercase;
		}
	}

	.puertos-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.puerto-card-mini {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: var(--radius-sm);

		.puerto-main {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.checkbox-custom {
			display: flex;
			align-items: center;
			gap: 8px;
			cursor: pointer;
			font-weight: 600;
			font-size: 0.9rem;

			input {
				width: 16px;
				height: 16px;
				accent-color: var(--color-accent);
			}
		}

		.tickets-counter {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			background: var(--color-bg-soft);
			border-radius: 999px;
			padding: 2px 8px;
			border: 1px solid var(--color-border);

			.btn-mini {
				width: 22px;
				height: 22px;
				border-radius: 50%;
				border: none;
				background: transparent;
				color: var(--color-text);
				font-size: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				&:hover:not(:disabled) {
					background: var(--color-accent-soft);
					color: var(--color-accent);
				}

				&:disabled {
					opacity: 0.3;
					cursor: not-allowed;
				}
			}

			.counter-val {
				min-width: 15px;
				text-align: center;
				font-weight: 700;
				font-size: 0.9rem;
			}

			.counter-label {
				font-size: 0.7rem;
				color: var(--color-text-mute);
				text-transform: uppercase;
				font-weight: 600;
				margin-left: 2px;
			}
		}

		.puerto-badge {
			font-weight: 700;
			font-family: "Neucha", cursive;
			color: #ef4444;

			&.built {
				color: var(--color-accent);
			}
		}
	}

	.puertos-footer {
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text-soft);

		.value {
			color: var(--color-accent);
			font-family: "Neucha", cursive;
			font-size: 1.1rem;
		}
	}
}
</style>
