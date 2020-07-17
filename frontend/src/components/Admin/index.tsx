import React, { useState } from 'react';
import {
  Professionals,
  DeleteProfessionalData,
  DeleteProfessionalVariables,
  AddProfessionalData,
  AddProfessionalVariables,
} from '../../helpers/interfaces';
import { Wrapper, Sidebar, Main } from './style';
import { useTheme } from '../Modal/ModalContext';
import { useQuery, useMutation } from '../../hooks/';
import { Button } from '../Style';
import {
  PROFESSIONALS,
  DELETE_PROFESSIONAL,
  ADD_PROFESSIONAL,
} from '../../queries';
import { Tag } from '../Tag';
import { Table } from '../Table';

const Form = ({ onConfirm }: { onConfirm: () => void }) => {
  const { setModalContent } = useTheme();
  const [
    addProfessional,
    { loading: addProfessionalLoading, error: addProfessionalError },
  ] = useMutation<AddProfessionalData, AddProfessionalVariables>(
    ADD_PROFESSIONAL
  );

  const handleAddProfessional = async (firstName: string, lastName: string) => {
    await addProfessional({ firstName, lastName });
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddProfessional(values.firstName, values.lastName);
    onConfirm();
    setModalContent(null);
  };

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form>
      <label htmlFor="firstName">Firstname</label>
      <input
        type="text"
        name="firstName"
        value={values.firstName}
        onChange={handleInputChange}
      />
      <label htmlFor="lastName">Lastname</label>
      <input
        type="text"
        name="lastName"
        value={values.lastName}
        onChange={handleInputChange}
      />
      <Button variant="primary" onClick={onSubmit}>
        Crear doctor
      </Button>
    </form>
  );
};

export const Admin = () => {
  const [
    deleteProfessional,
    { loading: deleteProfessionalLoading, error: deleteProfessionalError },
  ] = useMutation<DeleteProfessionalData, DeleteProfessionalVariables>(
    DELETE_PROFESSIONAL
  );

  const { data, refetch } = useQuery<Professionals>(PROFESSIONALS);

  const handleDeleteProfessional = async (id: string) => {
    await deleteProfessional({ id });
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
        <Button
          variant="secondary"
          onClick={() => {
            setModalContent(
              <div>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: 1.4,
                    display: 'block',
                  }}
                >
                  ¿Estás seguro que quieres eliminar al doctor?
                </span>
                <p
                  style={{
                    marginTop: '8px',
                    color: 'rgba(0,0,0,.65)',
                    fontSize: '14px',
                  }}
                >
                  Some descriptions
                </p>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                  <Button variant="secondary">No</Button>
                  <Button
                    variant="danger"
                    style={{ marginLeft: '8px' }}
                    onClick={() => {
                      setModalContent(null);
                      handleDeleteProfessional(item._id);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            );
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const { setModalContent } = useTheme();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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
          <Button
            variant="primary"
            onClick={() => {
              setModalContent(
                <form>
                  <label htmlFor="firstName">Firstname</label>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={e => handleInputChange(e)}
                  />
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={e => handleInputChange(e)}
                  />
                  <Button variant="primary">Crear doctor</Button>
                </form>
              );
            }}
          >
            Crear doctor
          </Button>
        </div>
        <Table columns={Columns} dataSource={data} />
      </Main>
    </Wrapper>
  );
};
