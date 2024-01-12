import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Body from "./Body";
import { setPlayerState, setUsers, setDevice } from "../redux/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Spotify() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const userInfo = {
              userId: res.data.id,
              userUrl: res.data.external_urls.spotify,
              name: res.data.display_name,
            };
            dispatch(setUsers(userInfo));
          }
        })
        .catch((err) => {
          toast(err.response.data.error.message);
        });
    };
    getUserInfo();
  }, [token, dispatch]);
  useEffect(() => {
    const getPlaybackState = async () => {
      await axios
        .get("https://api.spotify.com/v1/me/player", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setPlayerState(res.data.is_playing));
            dispatch(setDevice(res.data.device));
          }
        })
        .catch((err) => {
          console.log("🚀 ~ getPlaybackState ~ err:", err);
          toast(err.response.data.error.message);
        });
    };
    getPlaybackState();
  }, [token, dispatch]);
  return (
    <Container>
      <div className="spotify-body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body__contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify-body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
