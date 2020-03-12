import * as React from "react";
import { TextField } from "./components/Input";
import { GlobalStyle } from "./styles/GlobalStyles";
import { api } from "./config";
import { Calendar } from "./components/Calendar";
import { Doctor, Specialty, AvailableDays } from "./helpers/interfaces";

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
      specialty: { id: null, name: null },
      doctors: [],
      doctor: { id: null, name: null },
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
      `${api}/availablehours?specialty_id=${this.state.specialty.id}&professional_id=${this.state.doctor.id}`
    );
    const availableDays = await getAvailableDays.json();
    this.setState({
      availableDays: availableDays.data.availableDays,
      disabledDays: availableDays.data.disabledDays
    });
  }

  async componentDidMount() {
    const getSpecialties = await fetch(`${api}/specialties`);
    const getProfessionals = await fetch(
      `${api}/professionals/${this.state.specialty.id}`
    );
    const specialties = await getSpecialties.json();
    const professionals = await getProfessionals.json();
    this.setState({
      specialties: specialties.data,
      doctors: professionals.data
    });
  }

  setDoctor = async (doctor: Doctor) => {
    await this.setStateAsync({
      doctor: {
        name: doctor.name,
        id: doctor.id
      }
    });
    this.getAvailableDays();
  };

  setSpecialty = async (specialty: Specialty) => {
    await this.setStateAsync({
      specialty: {
        id: specialty.id,
        name: specialty.name
      },
      doctor: { id: null, name: null },
      placeholder: "Cargando doctores..."
    });
    const res = await fetch(`${api}/professionals/${this.state.specialty.id}`);
    const result = await res.json();
    this.setState({
      doctors: result.data,
      placeholder:
        result.data.length === 0
          ? "No hay doctores en la especialidad"
          : "Selecciona el doctor"
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
          selectedOption={this.state.doctor.name}
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
