<template>
  <div class="col-md-4">
    <div class="card m-2 shadow">
      <img
        :src="movie.img"
        class="rounded-top selectable"
        :data-bs-target="'#movie-' + movie.id"
        data-bs-toggle="modal"
        alt=""
      />
      <div class="card-body">
        <h2>{{ movie.title }}</h2>
        <p class="clip-text">{{ movie.overview }}</p>
        <small>Score: {{ Math.floor(movie.score) }}</small>
      </div>
    </div>
  </div>

  <!-- Movie details modal -->
  <Modal :id="'movie-' + movie.id">
    <template #modal-title>
      <h4>{{ movie.title }}</h4>
    </template>
    <template #modal-body>
      <div class="col-12">
        <img :src="movie.img" class="img-fluid" alt="" />
        <h4>{{ movie.title }}</h4>
        <h4>Score: {{ Math.floor(movie.score) }}</h4>
        <p>{{ movie.overview }}</p>
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            type="button"
            @click="addToWatchlist()"
            v-if="!onWatchlist"
          >
            Add To Watchlist
          </button>
          <button
            class="btn btn-danger"
            type="button"
            @click="removeFromWatchlist()"
            v-else
          >
            Remove from Watchlist
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import Pop from "../utils/Pop";
import { watchlistService } from "../services/WatchlistService";
import { logger } from "../utils/Logger";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Modal } from "bootstrap";
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      onWatchlist: computed(() =>
        AppState.watchlist.find((m) => m.id == props.movie.id)
      ),
      async removeFromWatchlist() {
        try {
          Modal.getOrCreateInstance(
            document.getElementById("movie-" + props.movie.id)
          ).toggle();
          await watchlistService.removeFromWatchlist(props.movie);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error.message);
        }
      },
      async addToWatchlist() {
        try {
          await watchlistService.addToWatchlist(props.movie);
          Modal.getOrCreateInstance(
            document.getElementById("movie-" + props.movie.id)
          ).toggle();
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error.message);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
