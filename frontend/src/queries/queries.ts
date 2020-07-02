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

export const HOURS = `
  query GetHours($professionalId: ID, $specialtyId: ID, $dateBegin: String, $dateEnd: String){
    Hours(getHourInput: {
      professional: $professionalId
      specialty: $specialtyId
      dateBegin: $dateBegin
      dateEnd: $dateEnd
    }) {
      professional {
        _id
      }
      specialty {
        _id
      }
      dates {
        date
        hours
      }
    }
  }
`;
