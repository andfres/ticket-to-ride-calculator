<template>
	<div>
		<div class="label">
			<div class="info">
				<p>Objetivo {{ objetivoId + 1 }}</p>
			</div>

			<input ref="input" type="number" :value="objetivoPuntos" @change="actualizarPuntos" />
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
	actualizarPuntosObjetivo(props.jugador.id, props.objetivoId, parseInt(input.value.value));
};
</script>

<style lang="scss" scoped>
input {
	width: 50px;
}
</style>
