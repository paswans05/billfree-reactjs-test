import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Volume() {
  const { token } = useSelector((state) => state.auth);
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <Container>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-right: 30px;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;
