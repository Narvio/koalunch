import { RestaurantData } from "@/api/responses/Menu";
import { State } from "vue";
import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state: {
    searchQuery: "",
    restaurants: [] as RestaurantData[],
    visibleRestaurants: [] as RestaurantData[]
  } as State,
  mutations,
  actions,
  modules: {}
});
