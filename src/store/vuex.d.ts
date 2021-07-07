import { RestaurantData } from "@/api/responses/Menu";
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    searchQuery: string;
    restaurants: RestaurantData[];
    visibleRestaurants: RestaurantData[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
