import React from 'react';
import { useQuery } from '@apollo/client';
import { SPECIALTIES } from '../queries';
import { Specialties } from '../interfaces/';
import { Button } from '../components/Style';
import { Table } from '../components/Table';

export function SpecialtiesView() {
  const Columns = [
    {
      title: 'ID',
    },
    {
      title: 'Name',
    },
    {
      title: 'Actions',
      render: (item: { _id: string }) => (
        <Button variant="secondary" value={item._id}>
          Eliminar
        </Button>
      ),
    },
  ];

  const { data, error } = useQuery<Specialties>(SPECIALTIES);

  return (
    <>
      <Table columns={Columns} dataSource={data} />
    </>
  );
}
