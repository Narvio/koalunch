import { RestaurantData } from "@/api/responses/Menu";
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { StoredLayout } from "./StoredLayout";

declare module "@vue/runtime-core" {
  interface State {
    searchQuery: string;
    restaurants: RestaurantData[];
    layout: StoredLayout;
    favourites: string[];
    filterFavourites: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
