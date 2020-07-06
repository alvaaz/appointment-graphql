import React, { useState } from 'react';
import {
  Professionals,
  DeleteProfessionalData,
  DeleteProfessionalVariables,
  AddProfessionalData,
  AddProfessionalVariables,
} from '../../helpers/interfaces';
import { Wrapper, Sidebar, Main } from './style';
import { Modal } from '../Modal';
import { useTheme } from '../../context/ModalContext';
import { useQuery, useMutation } from '../../lib/api';
import { Button } from '../Style';
import {
  PROFESSIONALS,
  DELETE_PROFESSIONAL,
  ADD_PROFESSIONAL,
} from '../../queries';
import { Tag } from '../Tag';
import { Table } from '../Table';

export const Admin = () => {
  const [values, setValues] = useState({ firstName: '', lastName: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
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
    await deleteProfessional({ id });
    refetch();
  };

  const handleAddProfessional = async (firstName: string, lastName: string) => {
    await addProfessional({ firstName, lastName });
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
          {items.map(item => (
            <Tag>{item.name}</Tag>
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
            setTheme(
              <Modal
                id={item._id}
                closeModal={closeModal}
                callback={() => handleDeleteProfessional(item._id)}
              >
                <div>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: 1.4,
                      display: 'block',
                    }}
                  >
                    Are you sure delete this task?
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
                </div>
              </Modal>
            );
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  const { setTheme } = useTheme();
  const closeModal = () => setTheme(null);
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
              setTheme(
                <Modal
                  id="8789"
                  closeModal={closeModal}
                  callback={() => handleAddProfessional('ddd', 'aaa')}
                >
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
                  </form>
                </Modal>
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
