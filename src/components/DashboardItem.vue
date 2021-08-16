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
      ref="filler"
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
      maxH: Infinity,
      nonReactive: {} as {
        isResizing: boolean;
        cardSize: CardSize | undefined
      }
    };
  },
  components: {
    RestaurandCard
  },
  props: {
    item: Object as PropType<GridItem>
  },
  mounted(): void {
    const observer = new (window as any).ResizeObserver(() => {
      if (!this.nonReactive.isResizing) {
        this.onCardResized(this.nonReactive.cardSize);
      }
    });

    observer.observe(this.$refs.filler as Element);
  },
  methods: {
    onCardResized(newSize?: CardSize): void {
      const gridItem = this.$refs.gridItem as any;
      if (!gridItem || !newSize) {
        return;
      }

      this.nonReactive.isResizing = true;

      try {
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

        this.nonReactive.cardSize = newSize;
      } finally {
        this.nonReactive.isResizing = false;
      }
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
