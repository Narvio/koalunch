<template>
  <div>
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        drag-allow-from=".card-header"
        drag-ignore-from=".koalunch-card-content"
      >
        <restaurand-card
          :restaurant="item.restaurant"
        />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { RestaurantData } from "@/api/responses/Menu";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";
import RestaurandCard from "./RestaurandCard.vue";

interface GridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  restaurant: RestaurantData;
}

@Options({
  components: {
    RestaurandCard,
  },
  props: {
    searchQuery: String,
  },
  methods: {
    ...mapActions([
      ActionTypes.LoadRestaurants
    ]),
    ...mapMutations([
      MutationTypes.SearchRestaurants
    ])
  },
  computed: {
    ...mapState({
      restaurants: "visibleRestaurants"
    }),
  },
  watch: {
    searchQuery(query: string): void {
      this.filterLayout(query);
    },
  },
})
export default class Dashboard extends Vue {
  /* vuex mappings */
  [ActionTypes.LoadRestaurants]!: () => Promise<void>;
  [MutationTypes.SearchRestaurants]!: (q: string) => void;
  restaurants!: RestaurantData[];
  /* --- */

  searchQuery = "";

  layout: GridItem[] = [];

  async mounted(): Promise<void> {
    await this[ActionTypes.LoadRestaurants]();
    this.filterLayout();
  }

  filterLayout(query = ""): void {
    this[MutationTypes.SearchRestaurants](query);
    this.recreateLayout();
  }

  recreateLayout(): void {
    this.layout = this.restaurants.map((restaurant, index) => ({
      x: (index * 3) % 12,
      y: index + 12,
      w: 3,
      h: 10,
      i: restaurant.id,
      restaurant: restaurant,
    }));
  }
}
</script>