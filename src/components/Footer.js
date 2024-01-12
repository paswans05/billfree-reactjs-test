import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";

import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
export default function Footer() {
  return (
    <Container>
      {/** Current Track Start */}
      <CurrentTrack />
      {/** Current Track end */}

      {/** Player Controls start */}
      <PlayerControls />
      {/** Player Controls end */}

      {/** Volume Controls start */}
      <Volume />
      {/** Volume Controls end */}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0f5257;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0px 10px 0px 0px;
  margin: auto;
`;
