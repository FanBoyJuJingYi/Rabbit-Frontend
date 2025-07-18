import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  'adminOrder/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data; // Return the orders data from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// update order delivery status
export const updateOrderStatus = createAsyncThunk(
  'adminOrder/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  'adminOrder/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0, // Assuming you want to track total sales
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        // caculate total sales
        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice; // Assuming each order has a totalPrice field
        }, 0);
        state.totalSales = totalSales; // Set the total sales
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder; // Update the order in the list
        }
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload); // Remove the deleted order
      })
  },
});
export default adminOrderSlice.reducer;
