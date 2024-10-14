// Frontend/src/Components/Store/store.js

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../../Features/Products/productsSlice'; // Updated path

const store = configureStore({
  reducer: {
    products: productsReducer, // Adding the products reducer to the store
  },
});

export default store;