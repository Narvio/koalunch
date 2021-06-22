<template>
  <div>
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
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
      >
        <div class="card luncher-card">
          <header class="card-header">
            <p class="card-header-title luncher-card-title">Eatology</p>
          </header>
          <div class="content luncher-card-content">
            <div class="">
              <p>Polévka: Hovězí vývar s játrovou rýží</p>
              <p>
                Rizoto z dlouhozrnné rýže s gorgonzolou, vlašskými ořechy,
                hrozny a krůtími kousky, parmezán 118,-
              </p>
              <p>
                Kuřecí gyros se zeleninou v naší bulce, bylinkový dresink,
                smažené bramborové hranolky 121,-
              </p>
              <p>
                Krůtí prsa zapečená italskou krustou, šťouchané brambory s
                cibulkou 118,-
              </p>
              <p>
                TÝDENNÍ MENU-Bramborové knedlíky plněné uzeným masem, červené
                zelí, smažená cibulka 141,-
              </p>
              <p>
                TÝDENNÍ MENU-Smažený kuřecí řízek, bramborový salát s majonézou
                141,-
              </p>
              <p>
                TÝDENNÍ MENU-Salát s fazolemi Borlotti, červenou cibulí,
                balkánským sýrem, kuřecími kousky, cherry rajčaty, listovými
                saláty, ředkvemi, vinným dresinkem a kousky ciabatty s česnekem
                141,-
              </p>
              <p>Polévka: Zabalit do REkrabičky</p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

interface GridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

@Options({
  components: {},
  props: {},
})
export default class Layout extends Vue {
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

<style scoped>
.luncher-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.luncher-card-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0.75rem;
}

.luncher-card-title {
  background-color: #d8a96c;
  color: black;
}
</style>
