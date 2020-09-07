import * as React from 'react';
import { TextField } from '../Input';
import { Calendar } from '../Calendar';
import { useQuery, useLazyQuery } from '@apollo/client';
import { PROFESSIONALS, SPECIALTIES, HOURS } from '../../queries';

import {
  HeaderApp,
  BackButton,
  TitleApp,
  MainApp,
  SectionCalendar,
  SubtitleApp,
  SectionProfessional,
  ProfessionalsHours,
} from './style';

import {
  Doctor,
  Specialty,
  Professionals,
  Specialties,
  DoctorsCalendar,
  AvailableDays,
  Hour,
} from '../../interfaces/';

type GetHoursVariables = {
  specialtyId?: string | null;
  professionalId?: string | null;
  dateBegin: string;
  dateEnd: string;
};
export default function App() {
  // QUERIES AND MUTATION
  const {
    data: professionalsData,
    loading: professionalsLoading,
    error: professionalsError,
    refetch: professionalsRefetch,
  } = useQuery<Professionals>(PROFESSIONALS);

  const { data: specialtiesData, error: specialtiesError } = useQuery<
    Specialties
  >(SPECIALTIES);

  const [
    getHour,
    { data: hoursData, refetch: hoursRefetch, error: hoursError },
  ] = useLazyQuery<GetHoursVariables>(HOURS);

  //STATES
  const [specialty, setSpecialty] = React.useState<Specialty | null>(null);
  const [professional, setProfessional] = React.useState<Doctor | null>(null);
  const [availableDays, setAvailableDays] = React.useState<{
    Hours: Hour[];
  } | null>(null);
  const [daySelected, setDaySelected] = React.useState<Date | null>(null);

  const specialtyId = specialty ? specialty._id : null;
  const professionalId = professional ? professional._id : null;

  React.useEffect(() => {
    professionalsRefetch({ specialtyId });
    setProfessional(null);
    getHour({
      variables: {
        specialtyId,
        professionalId,
        dateBegin: new Date().toISOString(),
        dateEnd: new Date(2020, 9, 0).toISOString(),
      },
    });
  }, [specialty]);

  // console.log(
  //   hoursData.Hours.map(item => item.dates),
  //   'hours'
  // );

  const specialties = specialtiesData ? specialtiesData.Specialties : null;
  const professionals = professionalsData
    ? professionalsData.Professionals
    : null;

  if (professionalsError || specialtiesError) {
    return <h2>Uh oh! Something went wrong - please try again</h2>;
  }

  const selectedDayRender = (
    <h3>
      {daySelected &&
        new Date(daySelected).toLocaleString('es-CL', {
          month: 'long',
          day: 'numeric',
        })}
    </h3>
  );

  return (
    <div className="App">
      <HeaderApp>
        <input type="checkbox" />
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
          parentCallback={setProfessional}
          data={professionals}
          select={false}
          placeholder={
            professionalsLoading ? 'Cargando médicos...' : 'Busca un médico'
          }
          disabled={professionalsLoading}
        />
      </HeaderApp>
      <MainApp>
        <SectionCalendar>
          <SubtitleApp>Selecciona el día</SubtitleApp>
          <Calendar
            availableDays={availableDays}
            parentCallback={setDaySelected}
          />
        </SectionCalendar>
        <SectionProfessional>
          <SubtitleApp>Selecciona tu médico y hora</SubtitleApp>
          <ProfessionalsHours>
            <header>{selectedDayRender}</header>
            <div>
              <div>
                <figure>
                  <img src="" />
                </figure>
              </div>
              <div>
                <h6>Nombre profesional</h6>
                <div>
                  <span>especialidad 1</span>
                  <span>especialidad 2</span>
                </div>
              </div>
            </div>
            <div>
              <button>13:15</button>
            </div>
          </ProfessionalsHours>
        </SectionProfessional>
      </MainApp>
    </div>
  );
}
