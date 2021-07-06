import { RestaurantData } from "@/api/responses/Menu";
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    restaurants: RestaurantData[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
