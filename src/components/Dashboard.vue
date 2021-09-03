<template>
  <div>
    <grid-layout
      ref="gridLayout"
      v-model:layout="layout"
      :col-num="3"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :cols="{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1}"
    >
      <dashboard-item
        v-for="item in layout"
        :item="item"
        :key="item.i"
      />
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, State } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import DashboardItem, { GridItem } from "./DashboardItem.vue";

export default defineComponent({
  components: {
    DashboardItem
  },
  props: {
    searchQuery: String,
  },
  data() {
    return {
      layout: []
    } as {
      layout: GridItem[]
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.LoadRestaurants
    ]),
    ...mapMutations([
      MutationTypes.SearchRestaurants
    ]),
    resetInnerLayoutData(): void {
      const gridLayout = this.$refs.gridLayout as any;
      gridLayout.lastBreakpoint = null;
      gridLayout.layouts = {};
    },

    filterLayout(query = ""): void {
      if (query !== "") {
        this[MutationTypes.SearchRestaurants]("");
        this.recreateLayout();
      }

      this.$nextTick(() => {
        this[MutationTypes.SearchRestaurants](query);
        this.recreateLayout();
      });
    },

    recreateLayout(): void {
      this.layout = this.restaurants.map((restaurant, index) => ({
        x: index % 3,
        y: Math.floor(index / 4),
        w: 1,
        h: 10,
        i: restaurant.id,
        restaurant: restaurant,
      }));
    }
  },
  computed: {
    ...mapState({
      restaurants: (state) => (state as State).visibleRestaurants,
    }),
  },
  watch: {
    searchQuery(query: string): void {
      this.filterLayout(query);
    },
  },
  async mounted(): Promise<void> {
    await this[ActionTypes.LoadRestaurants]();
    this.filterLayout();
    this.resetInnerLayoutData();
  }
});
</script>
