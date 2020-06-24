import React, { useState } from 'react';
import { Professionals } from '../../helpers/interfaces';
import { Wrapper, Sidebar, Main } from './style';
import { Modal } from '../Modal';
import { api } from '../../config';
import { useTheme } from '../../context/ModalContext';
import { useQuery } from '../../lib/api';
import { Button } from '../Style';
import { PROFESSIONALS } from '../../queries';

const mutation = `
  mutation createProfessional($firstName: String!, $lastName: String!){
    createProfessional(
      professionalInput: {
        firstName: $firstName,
        lastName: $lastName
      }
    ) {
      lastName
  }
}`;

export const Admin = () => {
  const [values, setValues] = useState({ firstName: '', lastName: '' });

  // const createDoctorRef = useRef<{ openModal(): void; close(): void }>();

  // const openModal = () => {
  //   if (createDoctorRef.current) createDoctorRef.current.openModal();
  // };

  // const closeModal = () => {
  //   if (createDoctorRef.current) createDoctorRef.current.close();
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const { data } = useQuery<Professionals>(PROFESSIONALS);
  const doctors = data ? data.Professionals : null;
  const doctorsList = doctors ? (
    <>
      {doctors.map((doctor, key) => {
        return (
          <tr key={key}>
            <td>{doctor._id}</td>
            <td>{doctor.firstName}</td>
            <td>{doctor.lastName}</td>
            <td>
              <Button
                variant="secondary"
                onClick={() =>
                  setTheme(<Modal id={doctor._id} closeModal={closeModal} />)
                }
              >
                Eliminar
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  ) : null;

  // const createDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await fetch(api, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: mutation,
  //       variables: {
  //         firstName: values.firstName,
  //         lastName: values.lastName,
  //       },
  //     }),
  //   });
  //   fetchDoctors();
  // };

  const handleDelete = async (_id: number | null) => {
    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation {
            deleteProfessional(
              _id: "${_id}"
            ) {
              firstName
          }
        }`,
      }),
    });
  };

  const { setTheme } = useTheme();
  const closeModal = () => setTheme(null);
  return (
    <Wrapper>
      <Sidebar>
        <a href="www.google.cl">Médicos</a>
        <a href="www.google.cl">Especialidades</a>
        <a href="www.google.cl">Ofertas</a>
      </Sidebar>
      {/* <Modal ref={createDoctorRef}>
        <form onSubmit={e => createDoctor(e)}>
          <h1>Modal Header</h1>
          <button onClick={closeModal}>X</button>
          <h1>Crear médico</h1>
          <label htmlFor="firstName">Firstname</label>
          <input type="text" name="firstName" onChange={handleInputChange} />
          <label htmlFor="lastName">Lastname</label>
          <input type="text" name="lastName" onChange={handleInputChange} />
          <button>Guardar</button>
        </form>
      </Modal> */}
      <Main>
        <div className="main__header">
          <h1>Médicos</h1>
          <Button variant="primary">Crear doctor</Button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>LastName</th>
            </tr>
            {doctorsList}
          </tbody>
        </table>
      </Main>
    </Wrapper>
  );
};
