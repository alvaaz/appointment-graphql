import styled from 'styled-components';

export const TH = styled.th`
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #486581;
  &:nth-child(1) {
    flex-basis: 240px;
  }
  &:nth-child(2) {
    flex-basis: 130px;
  }
  &:nth-child(3) {
    flex-basis: 200px;
  }
  &:nth-child(4) {
    flex-basis: 180px;
  }
`;

export const TD = styled.td`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #102a43;
  &:nth-child(1) {
    flex-basis: 240px;
  }
  &:nth-child(2) {
    flex-basis: 130px;
  }
  &:nth-child(3) {
    flex-basis: 200px;
  }
  &:nth-child(4) {
    flex-basis: 180px;
  }
  &:nth-child(5) {
    flex-grow: 1;
    text-align: right;
  }
`;

export const TR = styled.tr`
  border-bottom: 1px solid #e6e8eb;
  height: 48px;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const TableWrapper = styled.table`
  display: flex;
  flex-direction: column;
`;

export const THead = styled.thead`
  flex-basis: 40px;
  display: flex;
  flex-direction: column;
  position: sticky;
`;

export const TBody = styled.tbody``;
