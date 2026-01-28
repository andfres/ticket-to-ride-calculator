<template>
	<div v-if="jugador.visible" class="jugador">
		Nombre jugador:
		<input type="text" :value="jugador.nombre" @input="cambiarNombre" />

		<div>
			<InputVagon v-for="(ele, i) in vagones" :key="i" :vagon="ele" :jugadorId="jugador.id">
			</InputVagon>
			<p class="vagonesSinUsar">{{ vagonesSinUsar }} vagones sin usar</p>
			<p>Puntos vagones {{ jugador.puntosVagones }}</p>
		</div>

		<template v-if="gameMode === 'europe'">
			<hr />
			<InputEstaciones :jugador="jugador"></InputEstaciones>
			<div class="via-mas-larga">
				<label>
					<input
						type="checkbox"
						:checked="jugador.tieneViaMasLarga"
						@change="store.toggleViaMasLarga(jugador.id)"
					/>
					Vía más larga (+10 pts)
				</label>
			</div>
		</template>
		<hr />

		<InputObjetivo
			v-for="(obj, i) in props.jugador.objetivos"
			:key="i"
			:objetivoId="i"
			:objetivoPuntos="obj"
			:jugador="props.jugador"
		>
		</InputObjetivo>
		<button @click="aumentarNumeroObjetivos">Añadir objetivo</button>
		<hr />

		<p class="totalDisp">Total: {{ total }}</p>
	</div>
</template>

<script setup>
import InputVagon from "@/components/InputVagon.vue";
import InputEstaciones from "@/components/InputEstaciones.vue";
import InputObjetivo from "@/components/InputObjetivo.vue";

import { computed } from "vue";
import { useStore } from "@/stores/store";

import { storeToRefs } from "pinia";

const store = useStore();
const { gameMode } = storeToRefs(store);
const { addObjetivos, actualizarNombre } = store;

const props = defineProps({
	jugador: Object,
});

const total = computed(() => props.jugador.puntosTotales);

const vagones = computed(() => props.jugador.vagones);
const color = computed(() => props.jugador.color);

const vagonesSinUsar = computed(() => {
	return 45 - props.jugador.vagonesUsados;
});

const colorVagonesSinUsar = computed(() => {
	if (vagonesSinUsar.value < 0) {
		return "red";
	}
	return "black";
});

const cambiarNombre = (e) => {
	actualizarNombre(props.jugador.id, e.target.value);
};

const aumentarNumeroObjetivos = () => {
	addObjetivos(props.jugador.id);
};
</script>

<style lang="scss">
.jugador {
	//border: 3px solid red;
	border: 3px solid v-bind(color);
	width: min(350px, 100%);
	padding: 1rem;
	border-radius: 15px;
}
.vagonesSinUsar {
	color: v-bind(colorVagonesSinUsar);
}
.via-mas-larga {
	margin: 0.5rem 0;
	font-family: "Neucha", cursive;
	font-size: 1.1rem;
	label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}
	input {
		width: 18px;
		height: 18px;
	}
}

.totalDisp {
	font-size: 1.5rem;
	font-weight: bold;
	font-family: "Neucha", cursive;
	margin-top: 5px;
}

hr {
	margin: 0.5rem;
}
</style>
