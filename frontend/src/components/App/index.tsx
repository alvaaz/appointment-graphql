import * as React from 'react';
import { TextField } from '../Input';
import { Calendar } from '../Calendar';
import { useQuery } from '../../lib/api';
import { PROFESSIONALS, SPECIALTIES } from '../../queries';
import { server } from '../../lib/api/server';
import { HeaderApp, BackButton, TitleApp } from './style';

import {
  Doctor,
  Specialty,
  AvailableDays,
  Professionals,
  Specialties,
  DoctorsCalendar,
} from '../../helpers/interfaces';

export default function App() {
  const [specialty, setSpecialty] = React.useState<Specialty | null>(null);

  const [doctor, setDoctor] = React.useState<Doctor | null>(null);
  const [availableDays, setAvailableDays] = React.useState<
    AvailableDays[] | null
  >(null);
  const [closestDay, setClosestDay] = React.useState<Date | number>(0);
  const [doctorsCalendar, setDoctorsCalendar] = React.useState<
    DoctorsCalendar[] | null
  >(null);

  React.useEffect(() => {
    handleChange(specialty ? specialty._id : null);
  }, [specialty]);

  const {
    data: professionalsData,
    loading: professionalsLoading,
    error: professionalsError,
    refetch,
  } = useQuery<Professionals>(PROFESSIONALS);

  const { data: specialtiesData, error: specialtiesError } = useQuery<
    Specialties
  >(SPECIALTIES);

  const specialties = specialtiesData ? specialtiesData.Specialties : null;
  const professionals = professionalsData
    ? professionalsData.Professionals
    : null;

  if (professionalsError || specialtiesError) {
    return <h2>Uh oh! Something went wrong - please try again</h2>;
  }

  const handleChange = async (id: string | null | undefined) => {
    refetch({ id });
  };

  return (
    <div className="App">
      <HeaderApp>
        <BackButton />
        <TitleApp>Selecciona especialidad o médico</TitleApp>
        <TextField
          label="Especialidad"
          parentCallback={setSpecialty}
          value={specialty ? specialty.name : ''}
          data={specialties}
          select
        />
        <TextField
          label="Médico"
          parentCallback={setDoctor}
          data={professionals}
          select={false}
          placeholder={
            professionalsLoading ? 'Cargando médicos...' : 'Busca un médico'
          }
          disabled={professionalsLoading}
        />
      </HeaderApp>
      {/* <Calendar availableDays={availableDays} closestDay={closestDay} /> */}
    </div>
  );
}

// class App extends React.Component<{}, State> {

//   async getAvailableDays() {
//     const { doctor, specialty } = this.state;
//     const getAvailableDays = await fetch(
//       api,
//       init({
//         query: `query HoursQuery( $professional: ID, $specialty: ID ) {
//           Hours(getHourInput: {
//             professional: $professional,
//             specialty: $specialty
//           }) {
//             professional {
//               _id
//             }
//             specialty {
//               _id
//             }
//             dates {
//               date
//               hours
//             }
//           }
//         }`,
//         variables: {
//           professional: doctor._id,
//           specialty: specialty._id,
//         },
//       })
//     );
//     const availableDays = await getAvailableDays.json();

//     this.setState(
//       {
//         availableDays: availableDays.data.Hours,
//       },
//       () => {
//         const now = new Date();

//         let closest = Infinity;
//         const dates = this.state.availableDays.map((el, index, array) => {
//           el.dates.forEach(d => {
//             const date = new Date(d.date);
//             if (
//               date >= now &&
//               (date < new Date(closest) || date.getTime() < closest)
//             ) {
//               closest = new Date(d.date).getTime();
//             }
//           });
//           const d = new Date(closest);
//           const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
//           const fechas = el.dates.find(x => x.date === date);
//           if (fechas) {
//             fechas.professional = array[index].professional;
//             fechas.specialty = array[index].specialty;
//           }
//           return fechas;
//         });
//         const doctorsCalendar = dates.filter(el => el !== undefined);
//         console.log(doctorsCalendar);
//         this.setState({
//           closestDay: new Date(closest),
//           // doctorsCalendar: doctorsCalendar
//         });
//       }
//     );
//   }

//   async componentDidMount() {
//     const getSpecialties = await fetch(
//       api,
//       init({
//         query: '{ Specialties { _id, name } }',
//       })
//     );
//     const specialties = await getSpecialties.json();

//     const getProfessionals = await fetch(
//       api,
//       init({
//         query: '{ Professionals { _id, firstName, lastName } }',
//       })
//     );

//     const professionalsData = await getProfessionals.json();

//     const professionals = professionalsData.data.Professionals.map(
//       (professional: { _id: string; firstName: string; lastName: string }) => ({
//         ...professional,
//         fullName: `${professional.firstName} ${professional.lastName}`,
//       })
//     );

//     this.setState({
//       specialties: specialties.data.Specialties,
//       doctors: professionals,
//     });
//   }

//   setDoctor = async (doctor: Doctor) => {
//     await this.setStateAsync({
//       doctor: {
//         lastName: doctor.lastName,
//         firstName: doctor.firstName,
//         _id: doctor._id,
//       },
//     } as State);
//     this.getAvailableDays();
//   };

//   setSpecialty = async (specialty: Specialty) => {
//     await this.setStateAsync({
//       specialty: {
//         _id: specialty._id,
//         name: specialty.name,
//       },
//       doctor: { _id: null, firstName: null, lastName: null },
//       placeholder: 'Cargando doctores...',
//     } as State);

//     const getProfessionalsBySpecialty = await fetch(
//       api,
//       init({
//         query: `query ProfessionalsQuery($id: String) {
//           Professionals(specialtyId: $id) { _id, firstName, lastName }
//         }`,
//         variables: { id: this.state.specialty._id },
//       })
//     );

//     const professionalsBySpecialtyData = await getProfessionalsBySpecialty.json();

//     const professionals = professionalsBySpecialtyData.data.Professionals.map(
//       (professional: { _id: string; firstName: string; lastName: string }) => ({
//         ...professional,
//         fullName: `${professional.firstName} ${professional.lastName}`,
//       })
//     );

//     this.setState({
//       doctors: professionals,
//       placeholder:
//         professionalsBySpecialtyData.data.length === 0
//           ? 'No hay doctores en la especialidad'
//           : 'Selecciona el doctor',
//     });
//     this.getAvailableDays();
//   };

//   render() {
//     const {
//       availableDays,
//       closestDay,
//       doctors,
//       placeholder,
//       doctor,
//       specialties,
//       specialty,
//     } = this.state;
//     return (
//       <div className="App">
//         <header className="header">
//           <nav className="navbar" />
//         </header>
//         <TextField
//           label="Especialidad"
//           parentCallback={this.setSpecialty}
//           selectedOption={specialty.name}
//           value={specialty.name}
//           data={specialties}
//           select
//         />
//         <TextField
//           label="Médico"
//           parentCallback={this.setDoctor}
//           selectedOption={doctor.firstName}
//           data={doctors}
//           select={false}
//           placeholder={placeholder}
//         />
//         <Calendar availableDays={availableDays} closestDay={closestDay} />
//       </div>
//     );
//   }
// }

// export default App;
