import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylist, setPlaylistId } from "../redux/authentication";
export default function Playlists() {
  const dispatch = useDispatch();
  const { token, playlists } = useSelector((state) => state.auth);
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch(setPlaylist(playlists));
    };
    getPlaylistData();
  }, [token]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch(setPlaylistId(selectedPlaylistId));
  };
  return (
    <Container>
      <ul>
        {playlists &&
          playlists.map(({ name, id }) => {
            return (
              <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                {name}
              </li>
            );
          })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;
