import { RestaurantData } from "@/api/responses/Menu";
import { State } from "vue";
import { MutationTypes } from "./mutation-types";

export default {
  [MutationTypes.RestaurantsLoaded](state: State, restaurants: RestaurantData[]): void {
    state.restaurants = restaurants;
  }
};
