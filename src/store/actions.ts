import { State } from "vue";
import { ActionContext } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

export default {
  async [ActionTypes.LoadRestaurants](context: ActionContext<State, State>): Promise<void> {
    const response = await fetch("/api/restaurant");
    context.commit(MutationTypes.RestaurantsLoaded, await response.json());
  }
};
