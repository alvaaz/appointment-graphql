import * as React from 'react';
import { TextField } from './components/Input';
import { GlobalStyle } from './components/GlobalStyle';

interface Doctor {
  especialidades: string
}

interface MyProps {}
interface MyState {
  specialties: [],
  specialty: string | null,
  specialtyID: number | null,
  doctors: [],
  doctor: string | null,
  doctorID: number | null
}
class App extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      specialties: [],
      specialty: null,
      specialtyID: 0,
      doctors: [],
      doctor: null,
      doctorID: null
    }
  }

  async componentDidMount() {
    const specialties = await fetch('https://agenda.hospitalclinico.cl/api/specialties');
    const professionals = await fetch(`https://agenda.hospitalclinico.cl/api/professionals/${this.state.specialtyID}`);
    const json = await specialties.json();
    const result = await professionals.json();
    this.setState({
      specialties: json.data,
      doctors: result.data
    });
  }

  doctor = (doctor: string, id: number) => {
    this.setState({
      doctor: doctor,
      doctorID: id,
    });
  }
  specialty = (specialty: string, id: number) => {
    this.setState({
      specialty: specialty,
      specialtyID: id,
    });
    fetch(`https://agenda.hospitalclinico.cl/api/professionals/${this.state.specialtyID}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            doctors: result.data
          })
        },
      )
  }
  render() {
    // interface Doctor
    // var doctor = new Array<Person>();

    let specialties = this.state.doctors;
    let foundIdx: number;
    // var result = specialties.reduce<string>((accu, curr, idx, arr) => {
    //   if (accu.some((value, resIdx, reArr) => {  // present in out array?
    //     foundIdx = resIdx;
    //     return (value.orderType == curr.orderType && value.orderDate == curr.orderDate);
    //   })) {    // already present, increment OrderCount
    //     accu[foundIdx].orderCount += curr.orderCount;
    //   }
    //   else {   // not yet present push the element
    //     accu.push(curr);
    //   }
    //   return accu;
    // }, []);
    return (
      <div className="App">
        <GlobalStyle />
        <header className="header">
          <nav className="navbar">
          </nav>
        </header>
        <TextField
          label={'Especialidad'}
          parentCallback={this.specialty}
          selectedOption={this.state.specialty}
          value={this.state.specialty}
          data={this.state.specialties}
          select={true}
        />
        <TextField
          label={'Médico'}
          parentCallback={this.doctor}
          selectedOption={this.state.doctor}
          data={this.state.doctors}
          select={false}
        />

      </div>
    );
  }
}

export default App;
