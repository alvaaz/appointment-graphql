import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 32px;
`;

export const Sidebar = styled.aside`
  grid-column: 2 / span 2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  a {
    border-radius: 8px;
    padding: 0.625rem;
    text-decoration: none;
    color: rgb(110, 110, 110);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: rgb(245, 245, 245);
    }
  }
`;

export const Main = styled.main`
  grid-column: 4 / 12;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 32px 24px;
`;
