<template>
  <grid-item
    ref="gridItem"
    v-if="item"
    :x="item.x"
    :y="item.y"
    :w="item.w"
    :h="item.h"
    :i="item.i"
    :min-h="minH"
    :max-h="maxH"
    :key="item.i"
    drag-allow-from=".card-header"
    drag-ignore-from=".koalunch-card-content"
  >
    <div
      class="card koalunch-dashboard-item-filler"
    />
    <restaurand-card
      :restaurant="item.restaurant"
      @resized="onCardResized"
    />
  </grid-item>
</template>

<script lang="ts">
import { RestaurantData } from "@/api/responses/Menu";
import { defineComponent, PropType } from "vue";
import RestaurandCard, { CardSize } from "./RestaurandCard.vue";

export interface GridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  restaurant: RestaurantData;
}

export default defineComponent({
  data() {
    return {
      minH: 10,
      maxH: Infinity
    };
  },
  components: {
    RestaurandCard
  },
  props: {
    item: Object as PropType<GridItem>
  },
  methods: {
    onCardResized(newSize: CardSize): void {
      const gridItem = this.$refs.gridItem as any;
      const pos = gridItem.calcWH(newSize.height, newSize.width, true);

      this.maxH = pos.h;
      this.minH = pos.h;

      gridItem.eventBus.emit("resizeEvent", {
        eventType: "resizeend",
        i: gridItem.i,
        x: gridItem.innerX,
        y: gridItem.innerY,
        h: pos.h,
        w: pos.w
      });
    }
  }
});
</script>

<style scoped>
.koalunch-dashboard-item-filler {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
