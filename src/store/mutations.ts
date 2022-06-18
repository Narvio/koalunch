import { RestaurantData } from "@/api/responses/Menu";
import { State } from "vue";
import { MutationTypes } from "./mutation-types";
import { ApplyLayoutParams } from "./StoredLayout";

export default {
  [MutationTypes.RestaurantsLoaded](state: State, restaurants: RestaurantData[]): void {
    state.restaurants = restaurants;
    state.visibleRestaurants = restaurants;
  },

  [MutationTypes.SearchRestaurants](state: State, query = ""): void {
    const lowerCaseQuery = query.toLowerCase();
    state.searchQuery = query;
    state.visibleRestaurants = state.restaurants.filter((r) => r.name.toLowerCase().includes(lowerCaseQuery));
  },

  [MutationTypes.ApplyLayout](state: State, { breakpoint, layout }: ApplyLayoutParams): void {
    const mappedBreakpoint = breakpoint === "xs" || breakpoint === "xxs" ? "sm" : breakpoint;

    state.layout[mappedBreakpoint] = layout;
    state.layout = {
      ...state.layout,
      xs: state.layout.sm,
      xxs: state.layout.sm
    };

    localStorage.setItem("layout", JSON.stringify({
      lg: state.layout.lg
    }));
  }
};
