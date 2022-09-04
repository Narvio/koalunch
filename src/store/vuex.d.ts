import { RestaurantData } from "@/api/responses/Menu";
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { StoredLayout } from "./StoredLayout";
import { ViewType } from "./ViewType";

declare module "@vue/runtime-core" {
  interface State {
    searchQuery: string;
    restaurants: RestaurantData[];
    layout: StoredLayout;
    favourites: string[];
    viewType: ViewType;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
