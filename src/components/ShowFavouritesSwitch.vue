<template>
  <div
    class="buttons has-addons koalunch-buttons"
  >
    <a
      class="button koalunch-card-header-button"
      :class="{
        'is-selected': !filterFavourites,
        'koalunch-selected': !filterFavourites,
      }"
      @click="() => onSwitch(false)"
    >
      <span class="icon-text">
        <span
          class="icon ion-ionic koalunch-icon"
        >
          <ion-icon
            :name="'grid' + (filterFavourites ? '-outline' : '')"
          />
        </span>
        <span>{{ $t("favourites.all") }}</span>
      </span>
    </a>

    <a
      class="button koalunch-card-header-button"
      :class="{
        'is-selected': filterFavourites,
        'koalunch-selected': filterFavourites
      }"
      @click="() => onSwitch(true)"
    >
      <span class="icon-text">
        <span
          class="icon ion-ionic koalunch-icon"
        >
          <ion-icon
            :name="'star' + (filterFavourites ? '' : '-outline')"
          ></ion-icon>
        </span>
        <span>{{ $t("favourites.favourites") }}</span>
      </span>
    </a>
  </div>
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
    onSwitch(favouritesOnly: boolean) {
      this[MutationTypes.ToggleFilterFavourites](favouritesOnly);
    }
  },
  computed: {
    ...mapState({
      filterFavourites: (state) => (state as State).filterFavourites
    })
  }
});
</script>

<style scoped>
/* eslint-disable */
.koalunch-buttons {
  margin-left: 0.5rem;
}
.koalunch-selected {
  background-color: #d8a96c;
  color: black;
  font-weight: 500;
}
.koalunch-icon {
  opacity: 1;
}
</style>
