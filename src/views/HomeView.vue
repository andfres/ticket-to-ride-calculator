<template>
	<main>
		<h1>Calculadora</h1>
		<h1>¡Aventureros al Tren!</h1>

		<div class="selector-modo">
			<label for="modo">Modelo de juego: </label>
			<select id="modo" :value="gameMode" @change="(e) => setGameMode(e.target.value)">
				<option value="europe">Europe</option>
				<option value="amsterdam">Amsterdam</option>
			</select>
		</div>

		<div class="checks">
			<CheckColor v-for="(item, i) in jugadores" :key="gameMode + i" :jugador="item"></CheckColor>
		</div>

		<div class="jugadores">
			<ContadorJugador v-for="(item, i) in jugadores" :key="gameMode + i" :jugador="item">
			</ContadorJugador>
		</div>

		<footer>
			<p>Andrés Fresno. 2022</p>
			<p>https://github.com/andfres</p>
		</footer>
	</main>
</template>

<script setup>
import CheckColor from "@/components/CheckColor.vue";
import ContadorJugador from "@/components/ContadorJugador.vue";
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { jugadores, gameMode } = storeToRefs(store);
const { setGameMode } = store;
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Neucha&display=swap");
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

main {
	padding: 5px;
	border: 10px;
	background-color: beige;
	border: 1px solid red;

	.selector-modo {
		text-align: center;
		margin: 1rem 0;
		font-family: "Neucha", cursive;
		font-size: 1.2rem;

		select {
			padding: 5px;
			border-radius: 5px;
			font-family: inherit;
		}
	}

	.checks {
		background-color: azure;
		padding: 1rem;
		border: 1rem;
		display: flex;
		gap: 2rem;
		justify-content: center;
	}

	h1 {
		text-align: center;
		font-family: "Neucha", cursive;
	}
	.jugadores {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}
}
</style>
