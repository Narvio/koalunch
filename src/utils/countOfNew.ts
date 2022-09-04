import { RestaurantData } from "@/api/responses/Menu";

const countOfNew = (restaurants: RestaurantData[]): number => restaurants.filter(({ isNew }) => isNew).length;

export default countOfNew;
