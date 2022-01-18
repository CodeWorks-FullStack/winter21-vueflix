<template>
  <div class="row mt-2">
    <div class="col-12">
      <form @submit.prevent="searchMovies()">
        <div class="form-group d-flex">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            v-model="editable"
          />
          <button class="btn btn-success">Search</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-12 d-flex justify-content-center">
      <button
        class="btn btn-primary m-1"
        v-for="p in totalPages"
        :key="p"
        @click="nextPage(p)"
      >
        {{ p }}
      </button>
      <div class="d-flex">
        <button
          class="btn btn-danger"
          @click="lowScoreFilter = !lowScoreFilter"
        >
          Filter out awful movies
        </button>
        <div class="d-flex" @click="toggleAscending()">
          <button class="btn btn-success ms-2" v-if="!ascending">
            Popular
          </button>
          <button class="btn btn-warning ms-2" v-else>Not Popular</button>
        </div>
      </div>
    </div>
  </div>
  <!-- NOTE show search results here -->
  <div class="row">
    <!-- NOTE props can only be passed from parent to child -->
    <!-- NOTE here, our prop is :movie="m" -->
    <Movie v-for="m in movies" :key="m.id" :movie="m" />
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { moviesService } from "../services/MoviesService";
import { AppState } from "../AppState";
export default {
  setup() {
    const lowScoreFilter = ref(false);
    let ascending = ref(true);
    const editable = ref("");

    // NOTE filtering out movies that are rated lower than 50, based on user choice
    // NOTE button click is toggling the lowScoreFilter bool
    function filterLowRated(movie) {
      if (lowScoreFilter.value) {
        return movie.score > 50;
      }
      return true;
    }
    function sortByPopularity(a, b) {
      if (ascending.value) {
        return b.score - a.score;
      }
      return a.score - b.score;
    }
    return {
      // NOTE think of computed as your ProxyState.on AKA it's listening for changes in Appstate
      movies: computed(() =>
        AppState.searchResults.filter(filterLowRated).sort(sortByPopularity)
      ),
      totalPages: computed(() => AppState.totalPages),
      toggleAscending() {
        ascending.value = !ascending.value;
      },
      async searchMovies() {
        try {
          await moviesService.searchMovies(editable.value);
        } catch (error) {
          Pop(error.message, "error");
          logger.log(error.message);
        }
      },
      async nextPage(page) {
        try {
          await moviesService.searchMovies(editable.value, page);
        } catch (error) {
          Pop(error.message, "error");
          logger.log(error.message);
        }
      },
      editable,
      lowScoreFilter,
      ascending,
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
