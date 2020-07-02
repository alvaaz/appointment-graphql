import styled from 'styled-components';

export const HeaderApp = styled.header`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;

export const InputApp = styled.div`
  grid-column: 4 / 7;
  &:last-child {
    grid-column: 7 / 10;
  }
`;

export const BackButton = styled.a`
  grid-column: 3 / 4;
  justify-self: right;
  display: flex;
  position: relative;
  height: 48px;
  cursor: pointer;
  width: 48px;
  border: 0;
  border-radius: 50px;
  background: white;
  box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
    0 1px 1px 0 rgba(10, 22, 70, 0.1);
  transition: 0.2s all ease-in-out;
  &:hover {
    box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
      0 3px 3px -1px rgba(10, 22, 70, 0.1);
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE0cHgiIHZpZXdCb3g9IjAgMCAxNiAxNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Db21iaW5lZCBTaGFwZTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iSWNvbi0vLUFycm93LC1sZWZ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi4wMDAwMDAsIC0zLjAwMDAwMCkiIGZpbGw9IiMxNDI4NEIiPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC41ODU3ODY0LDExIEwyLjk5ODc3NTMzLDExIEMyLjQ0NjQ5MDU4LDExIDEuOTk4Nzc1MzMsMTAuNTUyMjg0NyAxLjk5ODc3NTMzLDEwIEMxLjk5ODc3NTMzLDkuNDQ3NzE1MjUgMi40NDY0OTA1OCw5IDIuOTk4Nzc1MzMsOSBMMTQuNTg1Nzg2NCw5IEwxMC4yOTI4OTMyLDQuNzA3MTA2NzggQzkuOTAyMzY4OTMsNC4zMTY1ODI0OSA5LjkwMjM2ODkzLDMuNjgzNDE3NTEgMTAuMjkyODkzMiwzLjI5Mjg5MzIyIEMxMC42ODM0MTc1LDIuOTAyMzY4OTMgMTEuMzE2NTgyNSwyLjkwMjM2ODkzIDExLjcwNzEwNjgsMy4yOTI4OTMyMiBMMTcuNzA3MTA2OCw5LjI5Mjg5MzIyIEMxOC4wOTc2MzExLDkuNjgzNDE3NTEgMTguMDk3NjMxMSwxMC4zMTY1ODI1IDE3LjcwNzEwNjgsMTAuNzA3MTA2OCBMMTEuNzA3MTA2OCwxNi43MDcxMDY4IEMxMS4zMTY1ODI1LDE3LjA5NzYzMTEgMTAuNjgzNDE3NSwxNy4wOTc2MzExIDEwLjI5Mjg5MzIsMTYuNzA3MTA2OCBDOS45MDIzNjg5MywxNi4zMTY1ODI1IDkuOTAyMzY4OTMsMTUuNjgzNDE3NSAxMC4yOTI4OTMyLDE1LjI5Mjg5MzIgTDE0LjU4NTc4NjQsMTEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ljk5OTM4OCwgMTAuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC05Ljk5OTM4OCwgLTEwLjAwMDAwMCkgIj48L3BhdGg+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
  }
`;

export const TitleApp = styled.h1`
  grid-column: 4 / 9;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.5;
  align-self: center;
`;

export const SubtitleApp = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #0a1f44;
  font-weight: 400;
`;

export const MainApp = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;

export const SectionCalendar = styled.section`
  grid-column: 4 / 7;
`;

export const SectionProfessional = styled.section`
  grid-column: 7 / 10;
`;

export const ProfessionalsHours = styled.div`
  box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
    0 6px 6px -1px rgba(10, 22, 70, 0.1);
  background-color: white;
  border-radius: 8px;
`;
