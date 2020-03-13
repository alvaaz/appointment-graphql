import * as React from "react";
import { TextField } from "./components/Input";
import { GlobalStyle } from "./styles/GlobalStyles";
import { api } from "./config";
import { Calendar } from "./components/Calendar";
import { Doctor, Specialty, AvailableDays } from "./helpers/interfaces";

const init = (data: { query: string; variables?: { id: number } }) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
};

interface IProps {}
interface IState {
  specialties?: [];
  specialty?: Specialty;
  doctors?: [];
  doctor?: Doctor;
  placeholder?: string | null;
  availableDays?: AvailableDays[];
  disabledDays?: string[];
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      specialties: [],
      specialty: { _id: null, name: null },
      doctors: [],
      doctor: { id: null, firstName: null, lastName: null },
      placeholder: null,
      availableDays: [],
      disabledDays: []
    };
  }

  setStateAsync(state: IState) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async getAvailableDays() {
    const getAvailableDays = await fetch(
      `${api}/availablehours?specialty_id=${this.state.specialty._id}&professional_id=${this.state.doctor.id}`
    );
    const availableDays = await getAvailableDays.json();
    this.setState({
      availableDays: availableDays.data.availableDays,
      disabledDays: availableDays.data.disabledDays
    });
  }

  async componentDidMount() {
    const getSpecialties = await fetch(
      api,
      init({
        query: "{ Specialties { _id, name } }"
      })
    );
    const specialties = await getSpecialties.json();

    const getProfessionals = await fetch(
      api,
      init({
        query: "{ Professionals { _id, firstName, lastName } }"
      })
    );

    const professionalsData = await getProfessionals.json();

    const professionals = professionalsData.data.Professionals.map(
      (professional: { _id: string; firstName: string; lastName: string }) => {
        return {
          ...professional,
          fullName: `${professional.firstName} ${professional.lastName}`
        };
      }
    );

    this.setState({
      specialties: specialties.data.Specialties,
      doctors: professionals
    });
  }

  setDoctor = async (doctor: Doctor) => {
    await this.setStateAsync({
      doctor: {
        lastName: doctor.lastName,
        firstName: doctor.firstName,
        id: doctor.id
      }
    });
    this.getAvailableDays();
  };

  setSpecialty = async (specialty: Specialty) => {
    await this.setStateAsync({
      specialty: {
        _id: specialty._id,
        name: specialty.name
      },
      doctor: { id: null, firstName: null, lastName: null },
      placeholder: "Cargando doctores..."
    });

    const getProfessionalsBySpecialty = await fetch(
      api,
      init({
        query: `query ProfessionalsQuery($id: String) {
          Professionals(specialtyId: $id) { _id, firstName, lastName }
        }`,
        variables: { id: this.state.specialty._id }
      })
    );

    const professionalsBySpecialtyData = await getProfessionalsBySpecialty.json();

    const professionals = professionalsBySpecialtyData.data.Professionals.map(
      (professional: { _id: string; firstName: string; lastName: string }) => {
        return {
          ...professional,
          fullName: `${professional.firstName} ${professional.lastName}`
        };
      }
    );

    this.setState({
      doctors: professionals,
      placeholder:
        professionalsBySpecialtyData.data.length === 0
          ? "No hay doctores en la especialidad"
          : "Selecciona el doctor"
    });
    // this.getAvailableDays();
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
        <Calendar
          availableDays={this.state.availableDays}
          disabledDays={this.state.disabledDays}
        />
      </div>
    );
  }
}

export default App;
