import * as React from "react";
import { TextField } from "./components/Input";
import { GlobalStyle } from "./styles/GlobalStyles";
import { api } from "./config";
import { Calendar } from "./components/Calendar";
import { Doctor, Specialty } from "./helpers/interfaces";

const init = (data: {
  query: string;
  variables?: { id?: number; professional?: number; specialty?: number };
}) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
};

interface IProps {}
interface IState {
  specialties?: [];
  specialty?: Specialty;
  doctors?: [];
  doctor?: Doctor;
  placeholder?: string | null;
  availableDays?: [{ date: Date; hours: [] }];
  disabledDays?: string[];
  closestDay?: Date;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      specialties: [],
      specialty: { _id: null, name: null },
      doctors: [],
      doctor: { _id: null, firstName: null, lastName: null },
      placeholder: null,
      availableDays: [{ date: null, hours: [] }],
      disabledDays: [],
      closestDay: null,
    };
  }

  setStateAsync(state: IState) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async getAvailableDays() {
    const getAvailableDays = await fetch(
      api,
      init({
        query: `query HoursQuery( $professional: ID, $specialty: ID ) {
          Hours(getHourInput: { professional: $professional, specialty: $specialty }) { date hours }
        }`,
        variables: {
          professional: this.state.doctor._id,
          specialty: this.state.specialty._id,
        },
      })
    );
    const availableDays = await getAvailableDays.json();

    this.setState({
      availableDays: availableDays.data.Hours,
    });
  }

  async componentDidMount() {
    const getSpecialties = await fetch(
      api,
      init({
        query: "{ Specialties { _id, name } }",
      })
    );
    const specialties = await getSpecialties.json();

    const getProfessionals = await fetch(
      api,
      init({
        query: "{ Professionals { _id, firstName, lastName } }",
      })
    );

    const professionalsData = await getProfessionals.json();

    const professionals = professionalsData.data.Professionals.map(
      (professional: { _id: string; firstName: string; lastName: string }) => {
        return {
          ...professional,
          fullName: `${professional.firstName} ${professional.lastName}`,
        };
      }
    );

    this.setState({
      specialties: specialties.data.Specialties,
      doctors: professionals,
    });
  }

  setDoctor = async (doctor: Doctor) => {
    await this.setStateAsync({
      doctor: {
        lastName: doctor.lastName,
        firstName: doctor.firstName,
        _id: doctor._id,
      },
    });
    this.getAvailableDays();
  };

  setSpecialty = async (specialty: Specialty) => {
    await this.setStateAsync({
      specialty: {
        _id: specialty._id,
        name: specialty.name,
      },
      doctor: { _id: null, firstName: null, lastName: null },
      placeholder: "Cargando doctores...",
    });

    const getProfessionalsBySpecialty = await fetch(
      api,
      init({
        query: `query ProfessionalsQuery($id: String) {
          Professionals(specialtyId: $id) { _id, firstName, lastName }
        }`,
        variables: { id: this.state.specialty._id },
      })
    );

    const professionalsBySpecialtyData = await getProfessionalsBySpecialty.json();

    const professionals = professionalsBySpecialtyData.data.Professionals.map(
      (professional: { _id: string; firstName: string; lastName: string }) => {
        return {
          ...professional,
          fullName: `${professional.firstName} ${professional.lastName}`,
        };
      }
    );

    this.setState({
      doctors: professionals,
      placeholder:
        professionalsBySpecialtyData.data.length === 0
          ? "No hay doctores en la especialidad"
          : "Selecciona el doctor",
    });
    this.getAvailableDays();
  };

  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <header className="header">
          <nav className="navbar" />
        </header>
        <TextField
          label="Especialidad"
          parentCallback={this.setSpecialty}
          selectedOption={this.state.specialty.name}
          value={this.state.specialty.name}
          data={this.state.specialties}
          select={true}
        />
        <TextField
          label="Médico"
          parentCallback={this.setDoctor}
          selectedOption={this.state.doctor.firstName}
          data={this.state.doctors}
          select={false}
          placeholder={this.state.placeholder}
        />
        <Calendar availableDays={this.state.availableDays} />
      </div>
    );
  }
}

export default App;
