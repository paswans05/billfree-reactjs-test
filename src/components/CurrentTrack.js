import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPlaying } from "../redux/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CurrentTrack() {
  const dispatch = useDispatch();
  const { token, currentPlaying } = useSelector((state) => state.auth);
  useEffect(() => {
    const getCurrentTrack = async () => {
      await axios
        .get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const currentPlaying = {
              id: res.data.item.id,
              name: res.data.item.name,
              artists: res.data.item.artists.map((artist) => artist.name),
              image: res.data.item.album.images[2].url,
            };
            dispatch(setPlaying(currentPlaying));
          }
        })
        .catch((err) => {
          dispatch(setPlaying(null));
          toast(
            err.response
              ? err.response.data.error.message
              : "Something went wrong"
          );
        });
    };
    getCurrentTrack();
  }, [token, dispatch, currentPlaying]);
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;
