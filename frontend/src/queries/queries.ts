export const PROFESSIONALS = `
  query ProfessionalsQuery($id: String){
    Professionals(specialtyId: $id) {
      _id
      firstName
      lastName
      specialties {
        name
      }
    }
  }
`;

export const DELETE_PROFESSIONAL = `
  mutation DeleteProfessional($id: String!) {
    deleteProfessional(_id: $id) {
      _id
      firstName
      lastName
    }
  }
`;

export const ADD_PROFESSIONAL = `
  mutation Addprofessional($lastName: String!, $firstName: String!) {
    createProfessional(professionalInput: {
      firstName: $firstName
      lastName: $lastName
    }) {
      _id
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
