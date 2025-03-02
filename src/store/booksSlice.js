import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBooks, fetchBookById } from '../services/api'

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description: "A story of decadence and excess in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
    rating: 4.5,
    popular: true
  },
  {
    id: 2,
    title: "Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-Fiction",
    description: "An exploration of cosmic mysteries, from black holes to the big bang, making complex concepts accessible to non-scientists.",
    rating: 4.8,
    popular: true
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    description: "An epic science fiction novel set in a distant future amidst a feudal interstellar society, focusing on Paul Atreides and the desert planet Arrakis.",
    rating: 4.7,
    popular: true
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    description: "A dystopian social science fiction novel that tells the story of Winston Smith and his rebellion against the totalitarian state.",
    rating: 4.6,
    popular: true
  },
  {
    id: 5,
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Non-Fiction",
    description: "A fascinating exploration of evolution theory and natural selection from the gene's perspective.",
    rating: 4.4,
    popular: false
  },
  {
    id: 6,
    title: "Foundation",
    author: "Isaac Asimov",
    category: "Sci-Fi",
    description: "The story of a band of exiles who must preserve humanity's scientific knowledge to rebuild civilization throughout the galaxy.",
    rating: 4.5,
    popular: false
  }
]

export const fetchAllBooks = createAsyncThunk(
  'books/fetchAll',
  async (params) => {
    return await fetchBooks(params)
  }
)

export const fetchSingleBook = createAsyncThunk(
  'books/fetchSingle',
  async (id) => {
    return await fetchBookById(id)
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentBook: null
  },
  reducers: {
    addBook: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1, popular: false })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.currentBook = action.payload
      })
  }
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer 