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
} from '../../interfaces/';

type GetHoursVariables = {
  specialtyId?: string | null;
  professionalId?: string | null;
  dateBegin: string;
  dateEnd: string;
};

type GetHoursData = {
  Hours: {
    date: string;
    professionals: {
      professional: { _id: string; firstName: string };
      specialty: { _id: string; name: string };
      hours: string[];
    }[];
  }[];
};

export default function App() {
  // Queries & mutations
  const {
    data: professionalsData,
    loading: professionalsLoading,
    error: professionalsError,
    refetch: professionalsRefetch,
  } = useQuery<Professionals>(PROFESSIONALS);

  const { data: specialtiesData, error: specialtiesError } = useQuery<
    Specialties
  >(SPECIALTIES);

  const [getHour, { data: hoursData }] = useLazyQuery<
    GetHoursData,
    GetHoursVariables
  >(HOURS, {
    onCompleted: (data) =>
      setAvailableDays(data.Hours.map((item) => item.date)),
  });

  // States
  const [specialty, setSpecialty] = React.useState<Specialty | null>(null);
  const [professional, setProfessional] = React.useState<Doctor | null>(null);

  const [daySelected, setDaySelected] = React.useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<number>(0);
  const [currentYear, setCurrentYear] = React.useState<number>(0);
  const [availableDays, setAvailableDays] = React.useState<string[] | null>(
    null
  );

  const specialtyId = specialty ? specialty._id : null;
  const professionalId = professional ? professional._id : null;

  const getHourArg = {
    variables: {
      specialtyId,
      professionalId,
      dateBegin: new Date(currentYear, currentMonth, 1).toISOString(),
      dateEnd: new Date(currentYear, currentMonth + 1, 0).toISOString(),
    },
  };

  // Effects

  // Get hours when change specialty
  React.useEffect(() => {
    professionalsRefetch({ specialtyId });
    setProfessional(null);
    getHour(getHourArg);
  }, [specialty]);

  // Get hours when change month
  React.useEffect(() => {
    getHour(getHourArg);
  }, [currentMonth]);

  // Get hours when change professional
  React.useEffect(() => {
    getHour(getHourArg);
  }, [professional]);

  const specialties = specialtiesData ? specialtiesData.Specialties : null;
  const professionals = professionalsData
    ? professionalsData.Professionals
    : null;

  if (professionalsError || specialtiesError) {
    return <h2>Uh oh! Something went wrong - please try again</h2>;
  }

  const showDateSelected = (
    <h3>
      {daySelected &&
        new Date(daySelected).toLocaleString('es-CL', {
          month: 'long',
          day: 'numeric',
        })}
    </h3>
  );

  let selectDay =
    hoursData && daySelected
      ? hoursData.Hours.map((date) => new Date(date.date).getTime()).indexOf(
          new Date(daySelected).getTime()
        )
      : null;

  const Doctors = (
    <>
      <header>{showDateSelected}</header>
      <div>
        <div>
          <figure>
            <img src="" />
          </figure>
        </div>
        {hoursData && selectDay
          ? hoursData.Hours[selectDay]?.professionals.map((professional) => (
              <div>
                <h6>{professional.professional.firstName}</h6>
                <div>
                  <span>{professional.specialty.name}</span>
                </div>
                {professional.hours.map((hour) => (
                  <button>{hour}</button>
                ))}
              </div>
            ))
          : null}
      </div>
    </>
  );

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
            month={setCurrentMonth}
            year={setCurrentYear}
          />
        </SectionCalendar>
        <SectionProfessional>
          <SubtitleApp>Selecciona tu médico y hora</SubtitleApp>
          <ProfessionalsHours>{Doctors}</ProfessionalsHours>
        </SectionProfessional>
      </MainApp>
    </div>
  );
}
