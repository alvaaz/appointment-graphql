import React, { useState } from 'react';
import { MainHeader, Input, Label } from './style';
import { Table } from '../components/Table';
import { Button } from '../components/Style';
import { Tag } from '../components/Tag';
import { Modal } from '../components/Modal';
import {
  DeleteProfessionalData,
  DeleteProfessionalVariables,
  AddProfessionalData,
  AddProfessionalVariables,
} from '../interfaces/';

import message from '../components/Message/message';

import { useForm } from '../hooks/';

import { useQuery, useMutation } from '@apollo/client';
import {
  PROFESSIONALS,
  DELETE_PROFESSIONAL,
  ADD_PROFESSIONAL,
} from '../queries';
import { Professionals } from '../interfaces/';

export function DoctorsView() {
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

  const handleDeleteProfessional = async (id: string | null) => {
    await deleteProfessional({ variables: { id } });
    refetch();
  };

  const handleAddProfessional = async (firstName: string, lastName: string) => {
    await addProfessional({ variables: { firstName, lastName } });
    refetch();
  };

  const [open, setOpen] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<{
    _id: string | null;
    state: boolean;
  }>({ _id: null, state: false });

  const form = useForm();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddProfessional(form.values.firstName, form.values.lastName);
    setOpen(false);
    message.success('This is a success message');
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleDeleteProfessional(modalDelete._id);
    setModalDelete({ _id: null, state: false });
    message.success('This is a success message');
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
        <Button
          variant="secondary"
          value={item._id}
          onClick={() => setModalDelete({ _id: item._id, state: true })}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <>
      <MainHeader>
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
            <Label htmlFor="firstName">Firstname</Label>
            <Input type="text" {...form.getInput('firstName')} />
            <Label htmlFor="lastName">Lastname</Label>
            <Input type="text" {...form.getInput('lastName')} />
          </form>
        </Modal>
        <Modal
          visible={modalDelete.state}
          onOk={handleDelete}
          onCancel={() => setModalDelete({ _id: null, state: false })}
        >
          <p>¿Estás seguro?</p>
        </Modal>
      </MainHeader>
      <Table columns={Columns} dataSource={data} />
    </>
  );
}
