// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    token: null,
    userInfo: null,
    playlists: [],
    currentPlaying: null,
    playerState: false,
    selectedPlaylist: null,
    selectedPlaylistId: "6Pasp9hSadKphWSJMsxJRw",
    device: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsers: (state, action) => {
      state.userInfo = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlists = action.payload;
    },
    setPlaying: (state, action) => {
      state.currentPlaying = action.payload;
    },
    setPlayerState: (state, action) => {
      state.playerState = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const {
  setToken,
  setUsers,
  setPlaylist,
  setPlaying,
  setPlayerState,
  setSelectedPlaylist,
  setPlaylistId,
  setDevice,
} = authSlice.actions;

export default authSlice.reducer;
