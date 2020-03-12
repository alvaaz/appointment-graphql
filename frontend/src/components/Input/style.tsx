import styled, { css } from "styled-components";

export const Label = styled.label`
  font-weight: 500;
  color: #8a94a6;
  padding-bottom: 8px;
  text-transform: uppercase;
  font-size: 0.75rem;
`;

export const Wrapper = styled.div<{ select: boolean }>`
  position: relative;
  input {
    cursor: ${props => (props.select ? "pointer" : "text")};
  }
  span {
    display: ${props => (props.select ? "inline-flex" : "none")};
  }
`;

export const Icon = styled.span`
  color: #dbdbdb;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2.25em;
  z-index: 4;
  right: 0;
  svg {
    width: 1em;
    transition: 0.2s all ease-in-out;
  }
`;

export const Select = styled.div<{ isOpen: boolean }>`
  background-color: #dceeff;
  border: 1px solid transparent;
  color: #363636;
  box-shadow: none;
  max-width: 100%;
  width: 100%;
  display: inline-flex;
  font-size: 1rem;
  height: 3em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  border-radius: 4px;
  transition: 0.1s all ease-in-out;
  outline: none;
  appearance: none;
  cursor: pointer;

  ${props =>
    props.isOpen &&
    css`
      background-color: white;
      border-color: #0284fe;
      ~ ${Icon} {
        svg {
          transform: rotate(180deg);
        }
      }
    `}
`;

export const Input = styled.input<{ isOpen: boolean }>`
  background-color: #dceeff;
  border: 1px solid transparent;
  color: #363636;
  box-shadow: none;
  max-width: 100%;
  width: 100%;
  display: inline-flex;
  font-family: "Work Sans", sans-serif;
  font-size: 1rem;
  height: 3em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  border-radius: 4px;
  transition: 0.1s all ease-in-out;
  &:empty {
    border-color: #dceeff;
  }
  &:focus {
    background-color: white;
    border-color: #0284fe;
    outline: none;
    ~ ${Icon} {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;

export const Box = styled.div`
  ul {
    display: block;
    position: absolute;
    top: 3.2em;
    width: 100%;
    background-color: white;
    padding: 0.5rem;
    box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
      0 6px 6px -1px rgba(10, 22, 70, 0.1);
    position: absolute;
    transition: 0.2s all ease-in-out;
    z-index: 4;
    width: 100%;
    top: 56px;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 8px;
  }
`;
export const Item = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #4e5d78;
  margin-top: 8px;
  text-transform: capitalize;
  &:hover {
    background: #f3f1fa;
    border-radius: 8px;
  }
`;
