import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "numQuestions/fetchQuestions",
  async ({ numQuestions, category }, thunkAPI) => {
    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: numQuestions,
          category: category,
        },
      });
      console.log("API Params:", { amount: numQuestions, category: category });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "numQuestions/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const numQuestionsSlice = createSlice({
  name: "numQuestions",
  initialState: {
    value: 5,
    category: "",
    categories: [],
    questions: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setNumQuestions: (state, action) => {
      state.value = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.results;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.trivia_categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setNumQuestions, setCategory } = numQuestionsSlice.actions;

export default numQuestionsSlice.reducer;
