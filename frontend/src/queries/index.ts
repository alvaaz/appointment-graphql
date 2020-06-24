export const PROFESSIONALS = `
  query ProfessionalsQuery($id: String){
    Professionals(specialtyId: $id) {
      _id
      firstName
      lastName
    }
  }
`;

export const SPECIALTIES = `
  query {
    Specialties {
      _id,
      name
    }
  }
`;
