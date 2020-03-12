import styled from "styled-components";
import React from "react";

export const SVG_NEXT = () => {
  return (
    <svg width="8px" height="14px" viewBox="0 0 8 14">
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none">
        <g
          id="Icon-/-Angle,-right"
          transform="translate(-6.000000, -3.000000)"
          fill="#0A1F44"
        >
          <path
            d="M6.29289322,4.70710678 C5.90236893,4.31658249 5.90236893,3.68341751 6.29289322,3.29289322 C6.68341751,2.90236893 7.31658249,2.90236893 7.70710678,3.29289322 L13.7071068,9.29289322 C14.0976311,9.68341751 14.0976311,10.3165825 13.7071068,10.7071068 L7.70710678,16.7071068 C7.31658249,17.0976311 6.68341751,17.0976311 6.29289322,16.7071068 C5.90236893,16.3165825 5.90236893,15.6834175 6.29289322,15.2928932 L11.5857864,10 L6.29289322,4.70710678 Z"
            id="🎨-Icon-Color"
            transform="translate(10.000000, 10.000000) rotate(-360.000000) translate(-10.000000, -10.000000) "
          />
        </g>
      </g>
    </svg>
  );
};

export const SVG_PREV = () => {
  return (
    <svg width="8px" height="14px" viewBox="0 0 8 14">
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icon-/-Angle,-left"
          transform="translate(-6.000000, -3.000000)"
          fill="#0A1F44"
        >
          <path
            d="M6.29289322,4.70710678 C5.90236893,4.31658249 5.90236893,3.68341751 6.29289322,3.29289322 C6.68341751,2.90236893 7.31658249,2.90236893 7.70710678,3.29289322 L13.7071068,9.29289322 C14.0976311,9.68341751 14.0976311,10.3165825 13.7071068,10.7071068 L7.70710678,16.7071068 C7.31658249,17.0976311 6.68341751,17.0976311 6.29289322,16.7071068 C5.90236893,16.3165825 5.90236893,15.6834175 6.29289322,15.2928932 L11.5857864,10 L6.29289322,4.70710678 Z"
            id="🎨-Icon-Color"
            transform="translate(10.000000, 10.000000) scale(-1, 1) rotate(-360.000000) translate(-10.000000, -10.000000) "
          />
        </g>
      </g>
    </svg>
  );
};

export const Wrapper = styled.div`
  box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
    0 6px 6px -1px rgba(10, 22, 70, 0.1);
  background-color: white;
  border-radius: 8px;
  width: 500px;
  table {
    width: 100%;
  }
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const DayName = styled.div`
  width: 14.2%;
  height: 40px;
  text-align: center;
  text-transform: uppercase;
  color: #8a94a6;
  padding: 0.3rem;
  font-size: 14px;
  font-weight: 400;
`;

export const Day = styled.div<{
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
}>`
  width: 14.2%;
  height: 40px;
  vertical-align: middle;
  text-align: center;
  span {
    display: flex;
    place-items: center;
    place-content: center;
    margin: 0 auto;
    background-color: ${props =>
      props.isSelected ? "#2F55B9" : "transparent"};
    border: ${props =>
      props.isToday ? "0.2rem solid #2f55b9" : "0.1rem solid transparent"};
    border-radius: 100%;
    color: ${props => (props.isSelected ? "white" : "#0a1f44")};
    font-weight: ${props => (props.isToday ? "600" : "400")};
    cursor: pointer;
    outline: none;
    padding: 0;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    width: 2rem;
    height: 2rem;
    opacity: ${props => (props.isDisabled ? "0.25" : "1")};
    animation: bounce-button-in 0.45s 0s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      forwards;
    &:hover {
      background: white;
      color: ${props => (props.isSelected ? "white" : "#0a1f44")};
      border: ${props =>
        props.isDisabled ? "0.1rem solid transparent" : "0.1rem solid #2f55b9"};
      color: rgba(0, 0, 0, 0.7);
      text-decoration: none;
    }
  }
`;

export const Button = styled.button`
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  &:hover {
    background-color: gainsboro;
  }
`;

export const Nav = styled.div`
  background: white;
  font-size: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  flex-direction: row;
`;
