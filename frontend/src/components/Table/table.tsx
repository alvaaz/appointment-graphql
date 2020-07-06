import React from 'react';
import { TH, TD, TR, TableWrapper, THead, TBody } from './style';
import { Professionals } from '../../helpers/interfaces';

type Props = {
  dataSource?: Professionals | null;
  columns: {
    title: string;
    render?: (value: any) => React.ReactNode;
  }[];
};

export function Table({ dataSource, columns }: Props) {
  const dataList = dataSource ? (
    <>
      {dataSource.Professionals.map((item, key) => {
        return (
          <TR key={key}>
            <TD>{item._id}</TD>
            <TD>{item.firstName}</TD>
            <TD>{item.lastName}</TD>
            <TD>
              {columns[3].render ? columns[3].render(item.specialties) : null}
            </TD>
            <TD>{columns[4].render ? columns[4].render(item) : null}</TD>
          </TR>
        );
      })}
    </>
  ) : null;

  return (
    <TableWrapper>
      <THead>
        <TR>
          {columns.map(column => (
            <TH>{column.title}</TH>
          ))}
        </TR>
      </THead>
      <TBody>{dataList}</TBody>
    </TableWrapper>
  );
}
