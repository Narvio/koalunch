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
    visibleRestaurants: [] as RestaurantData[],
    layout: JSON.parse(localStorage.getItem("layout") || "{}") as StoredLayout
  } as State,
  mutations,
  actions,
  modules: {}
});
