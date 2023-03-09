import { getAllOrders } from './orders.model.js';

export default {
  Query: {
    orders: () => {
      return getAllOrders();
    }
  }
}