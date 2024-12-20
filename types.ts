export type UserRole = 'alumno' | 'profesor' | 'admin';

export type User = {
  dni: string;
  password: string;
  role: UserRole;
};

export type Plan = {
  id_plan: string;
  universidad_destino: string;
  centro: string;
  grado: string;
  curso: string;
  tipo1: 'simple' | 'anual';
  tipo2: 'alumnado' | 'profesorado';
  asignaturas: { origen: string; destino: string }[];
  creditos: number;
  fecha_limite: string;
  numero_plazas: number;
};

export type Solicitud = {
  id_solicitud: string;
  id_plan: string;
  dni_usuario: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'anulada';
  fecha_solicitud: string;
};

