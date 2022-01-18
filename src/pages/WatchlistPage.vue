<template>
  <div class="row">
    <Movie v-for="m in watchlistMovies" :key="m.id" :movie="m" />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      watchlistMovies: computed(() => AppState.watchlist),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
