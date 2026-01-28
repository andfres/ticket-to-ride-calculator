<template>
	<div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
		<div class="modal-content">
			<div class="modal-header">
				<h2>Reglas: {{ gameRules.nombre }}</h2>
				<button class="close-btn" @click="emit('close')">&times;</button>
			</div>
			<div class="modal-body">
				<p><strong>Piezas totales:</strong> {{ gameRules.piezas }}</p>
				<hr />
				<div v-for="(regla, index) in gameRules.reglas" :key="index" class="regla-item">
					<h3>{{ regla.titulo }}</h3>
					<p>{{ regla.descripcion }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import reglasData from "@/assets/reglas.json";

const props = defineProps({
	isOpen: Boolean,
	mode: String,
});

const emit = defineEmits(["close"]);

const gameRules = computed(() => {
	return reglasData[props.mode] || { nombre: "Desconocido", piezas: 0, reglas: [] };
});
</script>

<style lang="scss" scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	background: white;
	padding: 2rem;
	border-radius: 15px;
	width: min(500px, 90%);
	max-height: 80vh;
	overflow-y: auto;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	font-family: "Neucha", cursive;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #f0ead6;
	padding-bottom: 0.5rem;

	h2 {
		margin: 0;
		color: #5d4037;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: #8d6e63;
		&:hover {
			color: #5d4037;
		}
	}
}

.modal-body {
	color: #4e342e;

	.regla-item {
		margin-bottom: 1.5rem;
		h3 {
			margin-top: 0;
			margin-bottom: 0.5rem;
			color: #795548;
		}
		p {
			margin: 0;
			line-height: 1.4;
		}
	}
}

hr {
	margin: 1rem 0;
	border: none;
	border-top: 1px solid #f0ead6;
}
</style>
