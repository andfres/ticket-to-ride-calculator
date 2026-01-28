<template>
	<div class="historial-container">
		<button class="btn-volver" @click="volver">← Volver</button>
		<h1>Historial de Partidas</h1>

		<div v-if="historial.length === 0" class="mensaje-vacio">
			No hay partidas guardadas todavía.
		</div>

		<div v-else class="lista-partidas">
			<div v-for="(partida, index) in historial" :key="index" class="card-partida">
				<div class="header-partida">
					<span class="fecha">{{ formatearFecha(partida.fecha) }}</span>
					<span class="modo">Modo: {{ partida.modo }}</span>
					<button class="btn-eliminar" @click="eliminar(index)">Eliminar</button>
				</div>
				<div class="jugadores-partida">
					<div
						v-for="jugador in partida.jugadores.filter((j) => j.visible)"
						:key="jugador.nombre"
						class="info-jugador"
					>
						<span class="nombre">{{ jugador.nombre }}</span>
						<span class="puntos">{{ jugador.puntos }} pts</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStore } from "@/stores/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useStore();
const { historial } = storeToRefs(store);
const { eliminarPartida } = store;
const router = useRouter();

const volver = () => {
	router.push("/");
};

const eliminar = (index) => {
	if (confirm("¿Estás seguro de que quieres eliminar esta partida del historial?")) {
		eliminarPartida(index);
	}
};

const formatearFecha = (stringFecha) => {
	const fecha = new Date(stringFecha);
	return fecha.toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
</script>

<style lang="scss" scoped>
.historial-container {
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
	font-family: "Neucha", cursive;
	background-color: beige;
	min-height: 100vh;

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.btn-volver {
		padding: 8px 16px;
		background: none;
		border: 1px solid #333;
		border-radius: 4px;
		cursor: pointer;
		margin-bottom: 20px;
		font-family: inherit;
		font-size: 1.1rem;

		&:hover {
			background-color: #eee;
		}
	}

	.mensaje-vacio {
		text-align: center;
		font-size: 1.5rem;
		margin-top: 3rem;
		color: #666;
	}

	.lista-partidas {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.card-partida {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
		border-left: 5px solid #2196f3;

		.header-partida {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1rem;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid #eee;

			.fecha {
				font-size: 1.2rem;
				font-weight: bold;
			}

			.modo {
				text-transform: capitalize;
				color: #666;
			}

			.btn-eliminar {
				background: #ff5252;
				color: white;
				border: none;
				padding: 4px 8px;
				border-radius: 4px;
				cursor: pointer;
				font-family: inherit;

				&:hover {
					background: #ff1744;
				}
			}
		}

		.jugadores-partida {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			.info-jugador {
				background: #f5f5f5;
				padding: 8px 12px;
				border-radius: 6px;
				display: flex;
				gap: 10px;

				.nombre {
					font-weight: bold;
				}

				.puntos {
					color: #2196f3;
				}
			}
		}
	}
}
</style>
