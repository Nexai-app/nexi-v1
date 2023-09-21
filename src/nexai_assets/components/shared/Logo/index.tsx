import { Image } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

type DimensionType = {
  w?: string;
  h?: string;
};

function index({ w, h }: DimensionType) {
  return (
    <NavLink to={`/dashboard`}>
      <Image w={w ? w : "80px"} h={h ? h : "75px"} src={`nexai-logo.jpg`} />
    </NavLink>
  );
}

export default index;
