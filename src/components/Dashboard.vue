<template>
  <div>
    <grid-layout
      v-model:layout="filteredLayout"
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
        v-for="item in filteredLayout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        drag-allow-from=".card-header"
        drag-ignore-from=".koalunch-card-content"
      >
        <restaurand-card :restaurantId="item.i" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { RestaurantData } from "@/api/responses/Menu";
import { Vue, Options } from "vue-class-component";
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
  watch: {
    searchQuery(query: string): void {
      this.filterLayout(query);
    },
  },
})
export default class Dashboard extends Vue {
  searchQuery = "";
  restaurants: RestaurantData[] = [];

  layout: GridItem[] = [];
  filteredLayout: GridItem[] = [];

  async mounted(): Promise<void> {
    const response = await fetch("/api/restaurant");

    this.restaurants = await response.json();

    this.layout = this.restaurants.map((r, index) => ({
      x: (index * 3) % 12,
      y: index + 12,
      w: 3,
      h: 5,
      i: r.id,
      restaurant: r,
    }));
    this.filteredLayout = this.layout;
  }

  filterLayout(query: string): void {
    const lowerCaseQuery = query.toLowerCase();

    this.filteredLayout = this.layout.filter(
      (item) => item.restaurant.name.toLowerCase().includes(lowerCaseQuery)
    );
  }
}
</script>
