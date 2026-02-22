<template>
	<main class="home-view">
		<div class="header-section">
			<h1>Calculadora</h1>
			<h2>¡Aventureros al Tren!</h2>
			
			<div class="selector-container glass">
				<div class="field">
					<label for="modo">Modelo de juego</label>
					<select id="modo" :value="gameMode" @change="(e) => setGameMode(e.target.value)">
						<option value="europe">Europe</option>
						<option value="amsterdam">Amsterdam</option>
						<option value="vuelta-del-mundo">La vuelta al mundo</option>
						<option value="grandes-lagos">Los grandes lagos</option>
					</select>
				</div>
				<button class="btn-reglas" @click="showRules = true">
					<span>ℹ️</span> Ver Reglas
				</button>
			</div>
		</div>

		<ModalReglas :isOpen="showRules" :mode="gameMode" @close="showRules = false" />

		<div class="players-section">
			<div class="color-selector glass">
				<CheckColor v-for="(item, i) in jugadores" :key="gameMode + i" :jugador="item"></CheckColor>
			</div>

			<div class="jugadores-grid">
				<TransitionGroup name="card">
					<ContadorJugador v-for="(item, i) in jugadores" :key="gameMode + i" :jugador="item">
					</ContadorJugador>
				</TransitionGroup>
			</div>
		</div>

		<div class="controles-globales">
			<button class="btn btn-secundario" @click="irAHistorial">Ver Historial</button>
			<button class="btn btn-primario" @click="finalizarPartida">Finalizar Partida</button>
		</div>

		<footer class="main-footer">
			<p>Andrés Fresno &copy; 2022 - 2026</p>
			<a href="https://github.com/andfres" target="_blank">github.com/andfres</a>
		</footer>
	</main>
</template>

<script setup>
import CheckColor from "@/components/CheckColor.vue";
import ContadorJugador from "@/components/ContadorJugador.vue";
import ModalReglas from "@/components/ModalReglas.vue";
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const { jugadores, gameMode } = storeToRefs(store);
const { setGameMode, guardarPartida, resetGame } = store;
const router = useRouter();

const showRules = ref(false);

const finalizarPartida = () => {
	if (confirm("¿Estás seguro de que quieres finalizar la partida?")) {
		if (confirm("¿Quieres guardar los datos de la partida en el historial?")) {
			guardarPartida();
			alert("Partida guardada correctamente.");
		}
		resetGame();
	}
};

const irAHistorial = () => {
	router.push("/historial");
};
</script>

<style lang="scss" scoped>
.home-view {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;

	.header-section {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;

		h1 {
			font-size: 3.5rem;
			color: var(--color-accent);
			text-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
		}

		h2 {
			font-size: 1.8rem;
			color: var(--color-text-soft);
			margin-top: -1rem;
		}
	}

	.selector-container {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 1.5rem;
		padding: 1.5rem 2rem;
		border-radius: var(--radius-lg);
		width: fit-content;
		margin: 0 auto;

		.field {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			text-align: left;

			label {
				font-family: "Neucha", cursive;
				font-size: 1.2rem;
				color: var(--color-text-mute);
			}

			select {
				min-width: 220px;
			}
		}

		.btn-reglas {
			background: var(--color-bg-mute);
			color: var(--color-text);
			border: 1px solid var(--color-border);
			padding: 10px 20px;
			border-radius: var(--radius-md);
			display: flex;
			align-items: center;
			gap: 8px;
			height: 42px;

			&:hover {
				background: var(--color-accent-soft);
				border-color: var(--color-accent);
				color: var(--color-accent);
			}
		}
	}

	.players-section {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.color-selector {
			display: flex;
			justify-content: center;
			gap: 1.5rem;
			padding: 1rem;
			border-radius: var(--radius-md);
			width: fit-content;
			margin: 0 auto;
		}

		.jugadores-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
			gap: 2rem;
			width: 100%;
		}
	}

	.controles-globales {
		display: flex;
		gap: 1.5rem;

		.btn {
			padding: 1rem 2rem;
			font-size: 1.2rem;
			font-family: "Neucha", cursive;
			border-radius: var(--radius-md);
			font-weight: 500;
			box-shadow: var(--shadow-md);

			&:hover {
				transform: translateY(-2px);
				box-shadow: var(--shadow-lg);
			}

			&:active {
				transform: translateY(0);
			}
		}

		.btn-primario {
			background: var(--color-accent);
			color: var(--color-bg);
		}

		.btn-secundario {
			background: var(--color-bg-soft);
			color: var(--color-text);
			border: 1px solid var(--color-border);
		}
	}

	.main-footer {
		margin-top: 2rem;
		text-align: center;
		color: var(--color-text-mute);
		font-size: 0.9rem;

		a {
			color: var(--color-accent);
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}

/* Animations */
.card-enter-active,
.card-leave-active {
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-enter-from,
.card-leave-to {
	opacity: 0;
	transform: scale(0.9) translateY(20px);
}

.card-move {
	transition: transform 0.4s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
	.home-view .header-section h1 {
		font-size: 2.5rem;
	}
	.home-view .selector-container {
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		
		.field select {
			min-width: unset;
		}
	}
}
</style>
