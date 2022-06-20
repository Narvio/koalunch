<template>
  <a
    class="button is-ghost koalunch-card-header-button"
    @click="onSwitch"
  >
    <img
      v-if="filterFavourites"
      src="@/assets/favourite-filled.png"
      width="24"
      height="24"
    />
    <img
      v-if="!filterFavourites"
      src="@/assets/favourite-empty.png"
      width="24"
      height="24"
    />
  </a>
</template>

<script lang="ts">
import { MutationTypes } from "@/store/mutation-types";
import { defineComponent, State } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  methods: {
    ...mapMutations([
      MutationTypes.ToggleFilterFavourites
    ]),
    onSwitch() {
      this[MutationTypes.ToggleFilterFavourites](!this.filterFavourites);
    }
  },
  computed: {
    ...mapState({
      filterFavourites: (state) => (state as State).filterFavourites
    })
  }
});
</script>

<style>
/* eslint-disable */
</style>
