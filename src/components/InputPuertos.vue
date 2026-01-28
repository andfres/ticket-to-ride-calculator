<template>
	<div class="input-puertos">
		<div class="titulo-seccion">
			<span>Puertos (-4 si no construido)</span>
		</div>
		<div v-for="(puerto, index) in jugador.puertos" :key="index" class="puerto-row">
			<div class="puerto-check">
				<label :for="'puerto-' + jugador.id + '-' + index">
					<input
						type="checkbox"
						:id="'puerto-' + jugador.id + '-' + index"
						:checked="puerto.construido"
						@change="store.togglePortBuilt(jugador.id, index)"
					/>
					Puerto {{ index + 1 }}
				</label>
			</div>
			<div v-if="puerto.construido" class="puerto-tickets">
				<label>Tickets:</label>
				<select
					:value="puerto.tickets"
					@change="(e) => store.updatePortTickets(jugador.id, index, parseInt(e.target.value))"
				>
					<template v-if="gameMode === 'vuelta-del-mundo'">
						<option :value="0">0 (0 pts)</option>
						<option :value="1">1 (20 pts)</option>
						<option :value="2">2 (30 pts)</option>
						<option :value="3">3+ (40 pts)</option>
					</template>
					<template v-else>
						<option :value="0">0 (0 pts)</option>
						<option :value="1">1 (10 pts)</option>
						<option :value="2">2 (30 pts)</option>
						<option :value="3">3+ (30 pts)</option>
					</template>
				</select>
			</div>
			<div class="puerto-puntos">{{ calcularPuntosPuerto(puerto) }} pts</div>
		</div>
		<div class="total-puertos">Subtotal Puertos: {{ jugador.puntosPuertos }} pts</div>
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
.input-puertos {
	margin: 1rem 0;
	font-family: "Neucha", cursive;
}

.titulo-seccion {
	font-weight: bold;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #ccc;
}

.puerto-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	gap: 10px;
}

.puerto-check {
	display: flex;
	align-items: center;
	label {
		display: flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
	}
	input {
		width: 18px;
		height: 18px;
	}
}

.puerto-tickets {
	display: flex;
	align-items: center;
	gap: 5px;
	select {
		padding: 2px 5px;
		border-radius: 4px;
		font-family: inherit;
	}
}

.puerto-puntos {
	min-width: 50px;
	text-align: right;
	font-weight: bold;
}

.total-puertos {
	text-align: right;
	font-weight: bold;
	margin-top: 0.5rem;
	color: #2c3e50;
}
</style>
