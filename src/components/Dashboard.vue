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
      @breakpoint-changed="onBreakpointChanged"
    >
      <dashboard-item
        v-for="item in layout"
        :item="item"
        :key="item.i"
        @moved="onLayoutChanged"
        @resized="onLayoutChanged"
      />
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, State } from "vue";
import {
  mapActions,
  mapGetters,
  mapMutations,
  mapState
} from "vuex";

import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { RestaurantData } from "@/api/responses/Menu";
import { ApplyLayoutParams, LayoutBreakpoint } from "@/store/StoredLayout";
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
      layout: [],
      currentBreakpoint: "lg"
    } as {
      layout: GridItem[];
      currentBreakpoint: LayoutBreakpoint;
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.LoadRestaurants
    ]),
    ...mapMutations([
      MutationTypes.SearchRestaurants,
      MutationTypes.ApplyLayout,
    ]),
    resetInnerLayoutData(): void {
      const gridLayout = this.$refs.gridLayout as any;
      gridLayout.lastBreakpoint = null;
      gridLayout.layouts = {};
    },

    filterLayout(query = ""): void {
      if (query !== "") {
        this[MutationTypes.SearchRestaurants]("");
      }

      this.$nextTick(() => {
        this[MutationTypes.SearchRestaurants](query);
      });
    },

    recreateLayout(): void {
      const storedLayout = this.searchQuery ? [] : this.storedLayout[this.currentBreakpoint] || [];
      const { withLayout, withoutLayout } = (this.restaurants as RestaurantData[]).reduce((acc, restaurant) => {
        const layoutInfo = storedLayout.find(({ i }) => i === restaurant.id);
        if (layoutInfo) {
          acc.withLayout.push({
            ...layoutInfo,
            restaurant
          });
        } else {
          acc.withoutLayout.push(restaurant);
        }
        return acc;
      }, {
        withLayout: [] as GridItem[],
        withoutLayout: [] as RestaurantData[]
      });

      this.layout = withLayout.concat(
        withoutLayout.map((restaurant, index) => ({
          x: index % 3,
          y: Math.floor(index / 4),
          w: 1,
          h: 10,
          i: restaurant.id,
          restaurant: restaurant,
        }))
      );
    },
    onLayoutChanged() {
      this[MutationTypes.ApplyLayout]({
        breakpoint: this.currentBreakpoint,
        layout: this.layout.map((item) => ({
          x: item.x,
          y: item.y,
          h: item.h,
          w: item.w,
          i: item.i
        }))
      } as ApplyLayoutParams);
    },
    onBreakpointChanged(breakpoint: LayoutBreakpoint) {
      this.currentBreakpoint = breakpoint;
    }
  },
  computed: {
    ...mapState({
      storedLayout: (state) => (state as State).layout
    }),
    ...mapGetters({
      restaurants: "visibleRestaurants"
    })
  },
  watch: {
    searchQuery(query: string): void {
      this.filterLayout(query);
    },
    restaurants(): void {
      this.recreateLayout();
    }
  },
  async mounted(): Promise<void> {
    await this[ActionTypes.LoadRestaurants]();
    this.filterLayout();
    this.resetInnerLayoutData();
  }
});
</script>
