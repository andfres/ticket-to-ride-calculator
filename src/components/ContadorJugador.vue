<template>
	<div
		v-if="jugador.visible"
		class="jugador-card glass"
		:style="{ borderColor: jugador.color }"
	>
		<div class="card-header">
			<div class="player-info">
				<label>Nombre del Jugador</label>
				<input
					type="text"
					:value="jugador.nombre"
					@input="cambiarNombre"
					placeholder="Jugador..."
				/>
			</div>
		</div>

		<div class="card-body">
			<section class="section-vagones">
				<h3>Vagones</h3>
				<div class="vagones-grid">
					<InputVagon v-for="(ele, i) in vagones" :key="i" :vagon="ele" :jugadorId="jugador.id">
					</InputVagon>
				</div>
				<div class="vagones-info">
					<p :class="['pieces-left', { 'limit-reached': vagonesSinUsar < 0 }]">
						{{ vagonesSinUsar }} piezas restantes
					</p>
					<p class="points-hint">+{{ jugador.puntosVagones }} pts</p>
				</div>
			</section>

			<section class="section-objetivos">
				<h3>Objetivos</h3>
				<div class="objetivos-list">
					<InputObjetivo
						v-for="(obj, i) in props.jugador.objetivos"
						:key="i"
						:objetivoId="i"
						:objetivoPuntos="obj"
						:jugador="props.jugador"
					>
					</InputObjetivo>
				</div>
				<div class="objetivos-actions">
					<button class="btn-add-obj" @click="aumentarNumeroObjetivos">
						<span>+</span> Añadir
					</button>
					<button
						v-if="jugador.objetivos.length > 2"
						class="btn-remove-obj"
						@click="quitarUltimoObjetivo"
					>
						<span>−</span> Quitar
					</button>
				</div>
			</section>

			<section v-if="gameMode === 'europe'" class="section-europe">
				<h3>Opciones Europe</h3>
				<InputEstaciones :jugador="jugador"></InputEstaciones>
				<div class="legacy-bonus">
					<label class="checkbox-container">
						<input
							type="checkbox"
							:checked="jugador.tieneViaMasLarga"
							@change="store.toggleViaMasLarga(jugador.id)"
						/>
						<span class="checkmark"></span>
						Vía más larga (+10 pts)
					</label>
				</div>
			</section>

			<section
				v-if="gameMode === 'vuelta-del-mundo' || gameMode === 'grandes-lagos'"
				class="section-global"
			>
				<InputPuertos :jugador="jugador"></InputPuertos>
			</section>
		</div>

		<div class="card-footer" :style="{ background: jugador.color + '1a' }">
			<div
				class="score-badge-bottom"
				:style="{ background: jugador.color, color: isLightColor ? '#000' : '#fff' }"
			>
				<span class="label">Puntos Totales</span>
				<span class="value">{{ total }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import InputVagon from "@/components/InputVagon.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
import InputPuertos from "@/components/InputPuertos.vue";
import InputObjetivo from "@/components/InputObjetivo.vue";

import { computed } from "vue";
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { gameMode, maxPiezas } = storeToRefs(store);
const { addObjetivos, quitarObjetivo, actualizarNombre } = store;

const props = defineProps({
	jugador: Object,
});

const total = computed(() => props.jugador.puntosTotales);
const vagones = computed(() => props.jugador.vagones);
const vagonesSinUsar = computed(() => maxPiezas.value - props.jugador.vagonesUsados);

const cambiarNombre = (e) => {
	actualizarNombre(props.jugador.id, e.target.value);
};

const aumentarNumeroObjetivos = () => {
	addObjetivos(props.jugador.id);
};

const quitarUltimoObjetivo = () => {
	quitarObjetivo(props.jugador.id);
};

const isLightColor = computed(() => {
	const hex = props.jugador.color;
	if (!hex) return false;
	const color = hex.replace("#", "");
	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 155;
});
</script>

<style lang="scss" scoped>
.jugador-card {
	border-radius: var(--radius-lg);
	overflow: hidden;
	transition:
		transform 0.3s ease,
		box-shadow 0.3s ease;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 3px solid transparent;

	&:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.card-header {
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 255, 255, 0.03);

		.player-info {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			flex: 1;

			label {
				font-size: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.05em;
				color: var(--color-text-mute);
				font-weight: 600;
			}

			input {
				background: transparent;
				border: none;
				padding: 0;
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--color-text);
				width: 100%;

				&:focus {
					outline: none;
					color: var(--color-accent);
				}
			}
		}
	}

	.card-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		h3 {
			font-size: 1.2rem;
			color: var(--color-text-soft);
			margin-bottom: 0.5rem;
			padding-bottom: 0.25rem;
			border-bottom: 1px solid var(--color-border);
		}

		.section-vagones {
			.vagones-grid {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.vagones-info {
				margin-top: 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.pieces-left {
					font-size: 0.85rem;
					color: var(--color-text-mute);

					&.limit-reached {
						color: #ef4444;
						font-weight: 600;
					}
				}

				.points-hint {
					background: var(--color-accent-soft);
					color: var(--color-accent);
					padding: 2px 10px;
					border-radius: 999px;
					font-size: 0.8rem;
					font-weight: 700;
				}
			}
		}

		.section-objetivos {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.objetivos-list {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.objetivos-actions {
				display: flex;
				gap: 0.5rem;

				.btn-add-obj,
				.btn-remove-obj {
					flex: 1;
					background: var(--color-bg-soft);
					border: 1px dashed var(--color-border);
					color: var(--color-text-mute);
					padding: 0.6rem;
					border-radius: var(--radius-sm);
					font-size: 0.85rem;
					cursor: pointer;
					transition: all 0.2s;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 6px;

					&:hover {
						border-color: var(--color-accent);
						color: var(--color-accent);
						background: var(--color-accent-soft);
					}
				}

				.btn-remove-obj:hover {
					border-color: #ef4444;
					color: #ef4444;
					background: rgba(239, 68, 68, 0.1);
				}
			}
		}
	}

	.card-footer {
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid var(--color-border);
		background: rgba(255, 255, 255, 0.03);

		.score-badge-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 0.75rem 1.25rem;
			border-radius: var(--radius-md);
			box-shadow: var(--shadow-md);

			.label {
				font-size: 0.8rem;
				text-transform: uppercase;
				font-weight: 700;
				letter-spacing: 0.05em;
			}

			.value {
				font-size: 2rem;
				font-weight: 700;
				font-family: "Neucha", cursive;
				line-height: 1;
			}
		}
	}
}

.checkbox-container {
	display: flex;
	align-items: center;
	padding: 0.25rem 0.5rem;
	cursor: pointer;
	user-select: none;
	font-family: "Neucha", cursive;
	font-size: 1.1rem;
	color: var(--color-text-soft);
	gap: 10px;

	input {
		width: 18px;
		height: 18px;
		accent-color: var(--color-accent);
	}
}
</style>
