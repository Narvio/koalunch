import { State } from "vue";
import { ActionContext } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

export interface ContactFeedbackData {
  name: string;
  note: string;
}

export interface RestaurantFeedbackData {
  name: string;
  note: string;
  restaurantName: string;
  restaurantUrl: string;
}

export default {
  async [ActionTypes.LoadRestaurants](context: ActionContext<State, State>): Promise<void> {
    const response = await fetch("/api/restaurant");
    context.commit(MutationTypes.RestaurantsLoaded, await response.json());
  },

  async [ActionTypes.SendContactFeedback](context: ActionContext<State, State>, data: ContactFeedbackData): Promise<void> {
    await fetch("/feedback/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  },

  async [ActionTypes.SendRestaurantFeedback](context: ActionContext<State, State>, data: RestaurantFeedbackData): Promise<void> {
    await fetch("/feedback/addRestaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
};
