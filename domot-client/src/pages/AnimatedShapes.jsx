import React from "react";
import styled from "styled-components";

const Square = styled.div`
  width: 60px;
  height: 60px;
  background-color: #fff;
  opacity: 0.7;
  position: absolute;
  top: -60px;
  left: 450px;
  z-index: 1;
  animation: square 25s linear alternate infinite;
  @keyframes square {
    to {
      transform: translate(100vw, 30vh);
    }
  }
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 200px;
  left: 450px;
  z-index: 1;
  animation: circle 25s linear alternate infinite;
  @keyframes circle {
    to {
      transform: translate(100vw, 30vh);
    }
  }
`;

const Rect = styled.div`
  width: 50px;
  height: 100px;
  background-color: #fff;
  opacity: 0.5;
  position: absolute;
  top: 400px;
  left: 450px;
  z-index: 1;
  animation: rect 25s linear alternate infinite;
  @keyframes rect {
    to {
      transform: translate(100vw, 30vh);
    }
  }
`;

const AnimatedShapes = () => {
  return (
    <>
      <Square />
      <Circle />
      <Rect />
    </>
  );
};

export default AnimatedShapes;