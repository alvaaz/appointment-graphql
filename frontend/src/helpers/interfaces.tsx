export interface Doctor {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
}

export interface Specialty {
  _id: number | null;
  name: string | null;
}

export interface AvailableDays {
  Id_Profesional: number;
  Nombre_Profesional: string;
  Id_Agenda: number;
  Ruta_Foto: null;
  Especialidades: string;
  Tipo_Agenda: number;
  Id_Bloque: number;
  Fec_Reserva: string;
  Fec_Reserva_SQL: string;
  Nro_Reserva: number;
  Id_Estado_Reserva: number;
  Primera_Hora: string;
  Hora_Ini: string;
  Hora_Ter: string;
  Minutos: number;
  ESTADO_IN: number;
  SubJect: string;
}
