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
        <restaurand-card :restaurantId="item.i" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import RestaurandCard from "./RestaurandCard.vue";

interface GridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

@Options({
  components: {
    RestaurandCard,
  },
  props: {},
})
export default class Dashboard extends Vue {
  layout: GridItem[] = [
    {
      x: 0,
      y: 0,
      w: 5,
      h: 10,
      i: "1",
    },
  ];
}
</script>
