import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerState, setPlaying } from "../redux/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PlayerControls() {
  const dispatch = useDispatch();
  const { token, playerState, device } = useSelector((state) => state.auth);

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios
      .put(
        `https://api.spotify.com/v1/me/player/${state}?device_id=${
          device ? device.id : ""
        }`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          dispatch(setPlayerState(!playerState));
        }
      })
      .catch((err) => {
        toast(err.response.data && err.response.data.error.message);
      });
  };
  const changeTrack = async (type) => {
    await axios
      .post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          dispatch(setPlayerState(true));
        }
      })
      .catch((err) => {
        toast(
          err.response.data
            ? err.response.data.error.message
            : "The id of the device this command is targeting. If not supplied, the user's currently active device is the target."
        );
      });

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
          err.response.data
            ? err.response.data.error.message
            : "The id of the device this command is targeting. If not supplied, the user's currently active device is the target."
        );
      });
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
