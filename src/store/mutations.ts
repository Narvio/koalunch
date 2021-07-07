import { RestaurantData } from "@/api/responses/Menu";
import { State } from "vue";
import { MutationTypes } from "./mutation-types";

export default {
  [MutationTypes.RestaurantsLoaded](state: State, restaurants: RestaurantData[]): void {
    state.restaurants = restaurants;
    state.visibleRestaurants = restaurants;
  },

  [MutationTypes.SearchRestaurants](state: State, query = ""): void {
    const lowerCaseQuery = query.toLowerCase();
    state.searchQuery = query;
    state.visibleRestaurants = state.restaurants.filter((r) => r.name.toLowerCase().includes(lowerCaseQuery));
  }
};
