<template>
	<div class="historial-container">
		<header class="header-nav">
			<button class="btn-volver glass" @click="volver">{{ $t("general.back") }}</button>
		</header>

		<h1>{{ $t("general.history_title") }}</h1>

		<div v-if="historial.length === 0" class="mensaje-vacio glass">
			<p>{{ $t("general.no_games") }}</p>
		</div>

		<div v-else class="lista-partidas">
			<div v-for="(partida, index) in historial" :key="index" class="card-partida glass">
				<div class="header-partida">
					<div class="meta-info">
						<span class="fecha">{{ formatearFecha(partida.fecha) }}</span>
						<span class="modo-badge">{{ $t(`selector.modes.${partida.modo}`) }}</span>
					</div>
					<button class="btn-eliminar" @click="eliminar(index)" :title="$t('general.delete')">
						<span>&times;</span>
					</button>
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const { historial } = storeToRefs(store);
const { eliminarPartida } = store;
const router = useRouter();

const volver = () => {
	router.push("/");
};

const eliminar = (index) => {
	if (confirm(t("general.delete_confirm"))) {
		eliminarPartida(index);
	}
};

const formatearFecha = (stringFecha) => {
	const fecha = new Date(stringFecha);
	return fecha.toLocaleDateString(undefined, {
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
	padding: 2rem 1rem;
	max-width: 900px;
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	h1 {
		text-align: center;
		font-size: 3rem;
		color: var(--color-accent);
		text-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
		margin: 1rem 0;
	}

	.header-nav {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.btn-volver {
		padding: 0.6rem 1.2rem;
		color: var(--color-text-soft);
		border-radius: var(--radius-md);
		font-size: 1.1rem;
		font-family: "Neucha", cursive;
		display: flex;
		align-items: center;
		gap: 8px;

		&:hover {
			color: var(--color-accent);
			border-color: var(--color-accent);
			transform: translateX(-4px);
		}
	}

	.mensaje-vacio {
		padding: 3rem;
		text-align: center;
		border-radius: var(--radius-lg);
		color: var(--color-text-mute);
		font-size: 1.4rem;
		font-family: "Neucha", cursive;
	}

	.lista-partidas {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.card-partida {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		transition: transform 0.2s ease;

		&:hover {
			transform: scale(1.01);
		}

		.header-partida {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid var(--color-border);

			.meta-info {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;

				.fecha {
					font-size: 1.2rem;
					font-weight: 700;
					color: var(--color-text);
				}

				.modo-badge {
					font-size: 0.8rem;
					text-transform: uppercase;
					color: var(--color-accent);
					font-weight: 700;
					letter-spacing: 0.05em;
				}
			}

			.btn-eliminar {
				background: rgba(239, 68, 68, 0.1);
				color: #ef4444;
				border: 1px solid rgba(239, 68, 68, 0.2);
				width: 32px;
				height: 32px;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.5rem;
				cursor: pointer;
				line-height: 0;

				&:hover {
					background: #ef4444;
					color: white;
				}
			}
		}

		.jugadores-partida {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			.info-jugador {
				background: rgba(255, 255, 255, 0.04);
				padding: 0.75rem 1rem;
				border-radius: var(--radius-md);
				border: 1px solid var(--color-border);
				display: flex;
				align-items: baseline;
				gap: 12px;

				.nombre {
					font-weight: 600;
					color: var(--color-text-soft);
				}

				.puntos {
					font-family: "Neucha", cursive;
					font-size: 1.3rem;
					color: var(--color-accent);
					font-weight: 700;
				}
			}
		}
	}
}

@media (max-width: 640px) {
	.historial-container h1 {
		font-size: 2.2rem;
	}
	
	.card-partida .header-partida {
		flex-direction: row;
		align-items: center;
	}
}
</style>
