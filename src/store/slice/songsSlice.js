import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSongs } from "../../api/songsApi";
import { downloadSong } from "../../utils/downloadHelper";

export const loadSongs = createAsyncThunk("songs/loadSongs", async () => {
  const data = await fetchSongs();
  return data;
});

export const downloadSongThunk = createAsyncThunk(
  "songs/downloadSong",
  async (song, { rejectWithValue }) => {
    try {
      if (!song.url || !song.url.endsWith(".mp3")) {
        throw new Error("Invalid song URL");
      }
      const path = await downloadSong(song);
      return { id: song.id, path };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
    loading: false,
    downloadingId: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch songs
      .addCase(loadSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Download song
      .addCase(downloadSongThunk.pending, (state, action) => {
        state.downloadingId = action.meta.arg.id; 
      })
      .addCase(downloadSongThunk.fulfilled, (state, action) => {
        state.downloadingId = null;
        console.log("✅ Downloaded to: ", action.payload.path);
      })
      .addCase(downloadSongThunk.rejected, (state, action) => {
        state.downloadingId = null;
        state.error = action.payload;
      });
  },
});

export default songsSlice.reducer;
