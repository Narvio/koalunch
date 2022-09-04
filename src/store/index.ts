import { RestaurantData } from "@/api/responses/Menu";
import countOfNew from "@/utils/countOfNew";
import { State } from "vue";
import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { StoredLayout } from "./StoredLayout";
import { ViewType } from "./ViewType";

export default createStore({
  state: {
    searchQuery: "",
    restaurants: [] as RestaurantData[],
    layout: JSON.parse(localStorage.getItem("layout") || "{}") as StoredLayout,
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]") as string[],
    viewType: localStorage.getItem("viewType") || "All"
  } as State,
  mutations,
  actions,
  modules: {},
  getters: {
    visibleRestaurants: (state: State) => {
      const query = state.searchQuery.toLowerCase();
      let restaurants = state.restaurants.filter((r) => r.name.toLowerCase().includes(query));
      if (state.viewType === "Favourites") {
        restaurants = restaurants.filter((r) => state.favourites.includes(r.id));
      }
      if (state.viewType === "New") {
        restaurants = restaurants.filter(({ isNew }) => isNew);
      }
      return restaurants.sort(({ isNew }) => (isNew ? -1 : 1));
    },
    selectedViewType: (state: State): ViewType => {
      if (state.viewType === "New" && countOfNew(state.restaurants) === 0) {
        return "All";
      }

      return state.viewType;
    }
  }
});
