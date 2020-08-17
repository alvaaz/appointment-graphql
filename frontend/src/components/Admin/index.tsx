import React, { useState } from 'react';
import {
  Professionals,
  DeleteProfessionalData,
  DeleteProfessionalVariables,
  AddProfessionalData,
  AddProfessionalVariables,
} from '../../interfaces/';
import { Wrapper, Sidebar, Main } from './style';
import { useForm } from '../../hooks/';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '../Style';
import {
  PROFESSIONALS,
  DELETE_PROFESSIONAL,
  ADD_PROFESSIONAL,
} from '../../queries';
import { Tag } from '../Tag';
import { Table } from '../Table';
import { Modal } from '../Modal';

import message from '../Message/message';

export const Admin = () => {
  const [
    deleteProfessional,
    { loading: deleteProfessionalLoading, error: deleteProfessionalError },
  ] = useMutation<DeleteProfessionalData, DeleteProfessionalVariables>(
    DELETE_PROFESSIONAL
  );

  const [
    addProfessional,
    { loading: addProfessionalLoading, error: addProfessionalError },
  ] = useMutation<AddProfessionalData, AddProfessionalVariables>(
    ADD_PROFESSIONAL
  );

  const { data, refetch } = useQuery<Professionals>(PROFESSIONALS);

  const handleDeleteProfessional = async (id: string) => {
    await deleteProfessional({ variables: { id } });
    refetch();
  };

  const handleAddProfessional = async (firstName: string, lastName: string) => {
    await addProfessional({ variables: { firstName, lastName } });
    refetch();
  };

  const Columns = [
    {
      title: 'ID',
    },
    {
      title: 'FirstName',
    },
    {
      title: 'Lastname',
    },
    {
      title: 'Specialties',
      render: (items: { name: string }[]) => (
        <>
          {items.map((item, i) => (
            <Tag key={i}>{item.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      render: (item: { _id: string }) => (
        <Button variant="secondary">Eliminar</Button>
      ),
    },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddProfessional(form.values.firstName, form.values.lastName);
    setOpen(false);
    message.success('This is a success message');
  };

  return (
    <Wrapper>
      <Sidebar>
        <a href="www.google.cl">Médicos</a>
        <a href="www.google.cl">Especialidades</a>
        <a href="www.google.cl">Ofertas</a>
      </Sidebar>
      <Main>
        <div className="main__header">
          <h1>Médicos</h1>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Crear doctor
          </Button>
          <Modal
            visible={open}
            onOk={handleSubmit}
            onCancel={() => setOpen(false)}
          >
            <form>
              <label htmlFor="firstName">Firstname</label>
              <input type="text" {...form.getInput('firstName')} />
              <label htmlFor="lastName">Lastname</label>
              <input type="text" {...form.getInput('lastName')} />
            </form>
          </Modal>
        </div>
        <Table columns={Columns} dataSource={data} />
      </Main>
    </Wrapper>
  );
};
