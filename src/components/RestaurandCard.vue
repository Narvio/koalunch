<template>
  <div class="card koalunch-card">
    <header class="card-header koalunch-card-header">
      <p class="card-header-title koalunch-card-title">
        {{ restaurant?.name }}
      </p>
      <a
        class="button is-ghost koalunch-card-header-button"
        target="_blank"
        :href="restaurant?.url"
      >
        <img src="../assets/external-link.svg" />
      </a>
    </header>
    <div class="content koalunch-card-content">
      <busy-indicator v-if="isLoading" />

      <template v-if="menu">
        <PDFPreview v-if="isPdfMenu" :pdfInfo="menu.pdfInfo" />

        <template v-if="menu.menus && menu.menus.length !== 0">
          <menu-section
            v-for="section in menu.menus"
            :section="section"
            :key="section"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import {
  MenuApiResponse,
  MenuType,
  RestaurantData,
} from "../api/responses/Menu";
import MenuSection from "./restaurant/MenuSection.vue";
import BusyIndicator from "./utils/BusyIndicator.vue";
import PDFPreview from "./utils/PDFPreview.vue";

@Options({
  components: {
    MenuSection,
    BusyIndicator,
    PDFPreview,
  },
  props: {
    restaurantId: String,
  },
})
export default class RestaurantCard extends Vue {
  isLoading = true;
  restaurantId!: string;
  restaurant: RestaurantData | null = null;
  menu: MenuApiResponse | null = null;

  async mounted(): Promise<void> {
    const response = await fetch(`/api/menu/${this.restaurantId}`);
    const data = (await response.json()) as MenuApiResponse;

    this.restaurant = data.restaurant;
    this.menu = data;
    this.isLoading = false;
  }

  get isPdfMenu(): boolean {
    return this.menu?.type === MenuType.PDF;
  }
}
</script>

<style scoped>
.koalunch-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.koalunch-card-content {
  position: absolute;
  top: 3rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.koalunch-card-header {
  background-color: #d8a96c;
  height: 3rem;
  text-align: center;
}

.koalunch-card-title {
  color: black;
}

.koalunch-card-header-button {
  height: 100%;
}
</style>
