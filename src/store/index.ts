import { RestaurantData } from "@/api/responses/Menu";
import { State } from "vue";
import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { StoredLayout } from "./StoredLayout";

export default createStore({
  state: {
    searchQuery: "",
    restaurants: [] as RestaurantData[],
    layout: JSON.parse(localStorage.getItem("layout") || "{}") as StoredLayout,
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]") as string[],
    filterFavourites: JSON.parse(localStorage.getItem("filterFavourites") || "false") as boolean
  } as State,
  mutations,
  actions,
  modules: {},
  getters: {
    visibleRestaurants: (state: State) => {
      const query = state.searchQuery.toLowerCase();
      let restaurants = state.restaurants.filter((r) => r.name.toLowerCase().includes(query));
      if (state.filterFavourites) {
        restaurants = restaurants.filter((r) => state.favourites.includes(r.id));
      }
      return restaurants;
    }
  }
});
