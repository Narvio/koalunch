<template>
  <div
    class="card koalunch-card"
    ref="card"
    :data-res="restaurant?.id"
  >
    <header
      class="card-header koalunch-card-header"
    >
      <p
        class="card-header-title koalunch-card-title"
      >{{ restaurant?.name }}</p>
      <a
        v-if="restaurant !== undefined"
        class="button is-ghost koalunch-card-header-button"
        @click="() => onFavourite(restaurant?.id || '')"
      >
        <img
          v-if="favourites[restaurant.id]"
          src="@/assets/favourite-filled.png"
          width="24"
          height="24"
        />
        <img
          v-if="!favourites[restaurant.id]"
          src="@/assets/favourite-empty.png"
          width="24"
          height="24"
        />
      </a>
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
      <failure-message
        v-if="isFailed"
        :message="'Menu se nepodařilo načíst'"
      />

      <template v-if="menu">
        <PDFPreview
          v-if="isPdfMenu"
          :pdfInfo="menu.pdfInfo"
        />

        <template
          v-if="menu.menus && menu.menus.length !== 0"
        >
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
import { defineComponent } from "vue";
import { PropType, State } from "@vue/runtime-core";
import { mapMutations, mapState } from "vuex";
import { MutationTypes } from "@/store/mutation-types";
import {
  MenuApiResponse,
  MenuType,
  RestaurantData,
} from "../api/responses/Menu";
import MenuSection from "./restaurant/MenuSection.vue";
import BusyIndicator from "./utils/BusyIndicator.vue";
import FailureMessage from "./utils/FailureMessage.vue";
import PDFPreview from "./utils/PDFPreview.vue";

export interface CardSize {
  width: number;
  height: number;
}

export default defineComponent({
  components: {
    MenuSection,
    BusyIndicator,
    PDFPreview,
    FailureMessage
  },
  props: {
    restaurant: Object as PropType<RestaurantData>
  },
  emits: ["resized"],

  computed: {
    ...mapState({
      favourites: (state) => (state as State).favourites.reduce((acc, id) => ({
        ...acc,
        [id]: true
      }), {} as {
        [key: string]: boolean;
      }),
    }),
    isPdfMenu(): boolean {
      return this.menu?.type === MenuType.PDF;
    }
  },

  data() {
    return {
      isLoading: true,
      isFailed: false,
      menu: null
    } as {
      isLoading: boolean;
      isFailed: boolean;
      menu: MenuApiResponse | null;
    };
  },

  methods: {
    ...mapMutations([
      MutationTypes.MarkFavourite
    ]),
    onFavourite(id: string) {
      this[MutationTypes.MarkFavourite](id);
    }
  },

  async mounted(): Promise<void> {
    const observer = new (window as any).ResizeObserver((entries: any[]) => {
      this.$emit("resized", {
        width: entries[0].contentRect.width > 0 ? entries[0].contentRect.width : window.screen.availWidth,
        height: entries[0].contentRect.height
      } as CardSize);
    });

    observer.observe(this.$refs.card as Element);

    try {
      const response = await fetch(`/api/menu/${this.restaurant?.id}`);
      const data = (await response.json()) as MenuApiResponse;

      this.menu = data;
      this.isLoading = false;
    } catch (e) {
      this.isFailed = true;
      this.isLoading = false;
    }
  },
});
</script>

<style scoped>
.koalunch-card {
  overflow: hidden;
  box-shadow: none;
}

.koalunch-card-content {
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
  padding-left: 0;
}
</style>
