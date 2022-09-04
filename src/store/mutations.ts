import { RestaurantData } from "@/api/responses/Menu";
import isNew from "@/utils/isNew";
import { State } from "vue";
import { MutationTypes } from "./mutation-types";
import { ApplyLayoutParams } from "./StoredLayout";

export default {
  [MutationTypes.RestaurantsLoaded](state: State, restaurants: RestaurantData[]): void {
    state.restaurants = restaurants.map((restaurant) => ({
      ...restaurant,
      isNew: isNew(restaurant)
    }));
  },

  [MutationTypes.SearchRestaurants](state: State, query = ""): void {
    state.searchQuery = query;
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
  },

  [MutationTypes.MarkFavourite](state: State, id: string): void {
    if (state.favourites.includes(id)) {
      state.favourites = state.favourites.filter((i) => i !== id);
    } else {
      state.favourites.push(id);
    }

    localStorage.setItem("favourites", JSON.stringify(state.favourites));
  },

  [MutationTypes.ToggleFilterFavourites](state: State, enabled: boolean): void {
    state.filterFavourites = enabled;

    localStorage.setItem("filterFavourites", JSON.stringify(state.filterFavourites));
  }
};
