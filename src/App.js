import React, { useEffect } from "react";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/authentication";
import MusicPlayer from "./components/MusicPlayer";
export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    //Token is url find
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch(setToken(token));
      }
    }
    document.title = "Billfree Reactjs Test";
  }, [dispatch, token]);
  return <div>{token ? <MusicPlayer /> : <Login />}</div>;
}
