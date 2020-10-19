import React, { useRef, useState } from 'react';
import styled, { keyframes } from "styled-components";

import { colorWhite, borderColor, fontSizeTitle, colorTitle } from '../../Style/Styles';
import '../../Style/style.css';


const TitleContainerBlock = styled.div`
  padding: .7rem 2rem .7rem 1rem;
  display: flex;
  border-bottom: 1px ${borderColor} solid;
`;

const TitleText = styled.div`
  font-size: ${fontSizeTitle};
  font-weight: 700;
  text-transform: uppercase;
  color: ${colorTitle};
  margin-top: .5rem;
`;

const CloseButtonDiv = styled.div`
  border: 1px ${borderColor} solid;
  border-radius: 4px;
  margin-left: auto;
`;


const StyledSliderCloseSvg = styled.svg`
  width: .8rem;
  height: .8rem;
  margin: auto auto;
  display: block;
  stroke:#000000;
  stroke-width:3;
`;


const StyledSliderClose = styled.div`
  display: flex;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

function CloseButton({onClick}) {
  return (
    <CloseButtonDiv>
      <StyledSliderClose onClick={onClick}>
        <StyledSliderCloseSvg version="1.0" viewBox="0 0 24 24">
          <line x1="0" y1="24" x2="24" y2="0"/>
          <line x1="24" y1="24" x2="0" y2="0"/>
        </StyledSliderCloseSvg>
      </StyledSliderClose>
    </CloseButtonDiv>
  )
}

function stubOnClose(event) {
  console.log(event)
}

const Slider = styled.div`
    width: calc(100% - 30px);
    position: fixed;
    bottom: -10px;
    z-index: 1000;
    border-radius: 8px;
    background-color: ${colorWhite};
    box-shadow: 0 0 17px rgba(0, 0, 0, 0.2);
`;


const slidingBottom450 = keyframes`
    from { bottom: -450px; }
    to { bottom: -10px; }
`;

let SliderComponent450 = styled(Slider)`
    height: 450px;
    animation: ${slidingBottom450} 300ms ease-out 0s 1 normal;
`;

export default function SlidingBottomPanel({title, children, onClose=stubOnClose}) {
  const ref = useRef(null)
  const onCloseHandler = ((event) => {
    ref.current.classList.add("animate-close-slider")
    ref.current.classList.add("close-animation")
    setTimeout(onClose, 270);
  });

  return <SliderComponent450 ref={ref}>
    <TitleContainerBlock>
      <TitleText>{title}</TitleText>
      <CloseButton onClick={onCloseHandler}/>
    </TitleContainerBlock>
    {children}
  </SliderComponent450>
}

