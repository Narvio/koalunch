import { RestaurantData } from "@/api/responses/Menu";

const NOW = new Date();
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const NEW_LABEL_DAYS = 14;

const isNew = (restaurant: RestaurantData): boolean => {
  if (!restaurant.dateAdded) {
    return false;
  }

  const dateAdded = new Date(restaurant.dateAdded);

  return (NOW.getTime() - dateAdded.getTime()) / MS_PER_DAY <= NEW_LABEL_DAYS;
};

export default isNew;
