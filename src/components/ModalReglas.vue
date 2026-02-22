<template>
	<div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
		<div class="modal-content glass">
			<div class="modal-header">
				<h2>{{ $t("rules.title", { name: gameRules.nombre }) }}</h2>
				<button class="close-btn" @click="emit('close')">&times;</button>
			</div>
			<div class="modal-body">
				<p>
					<strong>{{ $t("rules.pieces", { n: gameRules.piezas || piezasTotales }) }}</strong>
				</p>
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
import { useI18n } from "vue-i18n";

const { tm, rt, t } = useI18n();

const props = defineProps({
	isOpen: Boolean,
	mode: String,
});

const emit = defineEmits(["close"]);

// Original pieces data (fixed per mode)
const piezasData = {
	europe: 45,
	amsterdam: 15,
	"vuelta-del-mundo": 60,
	"grandes-lagos": 60,
};

const piezasTotales = computed(() => piezasData[props.mode] || 0);

const gameRules = computed(() => {
	const rules = tm(`rules.${props.mode}`);
	if (!rules) return { nombre: t("rules.unknown"), reglas: [] };

	// tm returns a Proxy/Object from the locale, we need to handle it
	return {
		nombre: rt(rules.nombre),
		reglas: rules.reglas.map((r) => ({
			titulo: rt(r.titulo),
			descripcion: rt(r.descripcion),
		})),
	};
});
</script>

<style lang="scss" scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	backdrop-filter: blur(4px);
}

.modal-content {
	padding: 2.5rem;
	border-radius: var(--radius-lg);
	width: min(550px, 94%);
	max-height: 85vh;
	overflow-y: auto;
	box-shadow: var(--shadow-xl);
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(15, 23, 42, 0.85);

	&.glass {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 2rem;
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 1rem;

	h2 {
		margin: 0;
		color: var(--color-accent);
		font-size: 1.8rem;
		line-height: 1.2;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 2.5rem;
		cursor: pointer;
		color: var(--color-text-mute);
		line-height: 0.5;
		transition: color 0.2s;
		&:hover {
			color: #ef4444;
		}
	}
}

.modal-body {
	color: var(--color-text-soft);

	p {
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.regla-item {
		margin-bottom: 2rem;
		background: rgba(255, 255, 255, 0.03);
		padding: 1.25rem;
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-accent);

		h3 {
			margin-top: 0;
			margin-bottom: 0.75rem;
			color: var(--color-text);
			font-size: 1.2rem;
		}
		p {
			margin: 0;
			line-height: 1.6;
			font-size: 1rem;
		}
	}
}

hr {
	margin: 1.5rem 0;
	border: none;
	border-top: 1px solid var(--color-border);
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar {
	width: 6px;
}
.modal-content::-webkit-scrollbar-track {
	background: transparent;
}
.modal-content::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
}
</style>
