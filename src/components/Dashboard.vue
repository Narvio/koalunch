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
      :cols="{ lg: 3, md: 3, sm: 1, xs: 1, xxs: 1}"
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
import { RestaurantData } from "@/api/responses/Menu";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { Vue, Options } from "vue-class-component";
import { mapActions, mapMutations, mapState } from "vuex";
import DashboardItem, { GridItem } from "./DashboardItem.vue";

@Options({
  components: {
    DashboardItem
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

  processed: string[] = []

  layout: GridItem[] = [];

  async mounted(): Promise<void> {
    await this[ActionTypes.LoadRestaurants]();
    this.filterLayout();
    this.resetInnerLayoutData();
  }

  resetInnerLayoutData(): void {
    const gridLayout = this.$refs.gridLayout as any;
    gridLayout.lastBreakpoint = null;
    gridLayout.layouts = {};
  }

  filterLayout(query = ""): void {
    if (query !== "") {
      this[MutationTypes.SearchRestaurants]("");
      this.recreateLayout();
    }

    this.$nextTick(() => {
      this[MutationTypes.SearchRestaurants](query);
      this.recreateLayout();
    });
  }

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
}
</script>
