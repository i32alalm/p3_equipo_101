import { Plan, Solicitud } from '../types'

const initialPlanes: Plan[] = [
  {
    id_plan: '1',
    universidad_destino: 'Universidad de Barcelona',
    centro: 'Facultad de Economía y Empresa',
    grado: 'Grado en Administración y Dirección de Empresas',
    curso: '3º',
    tipo1: 'anual',
    tipo2: 'alumnado',
    asignaturas: [
      { origen: 'Contabilidad de Costes', destino: 'Contabilidad de Gestión' },
      { origen: 'Dirección Financiera', destino: 'Finanzas Corporativas' },
      { origen: 'Marketing Estratégico', destino: 'Estrategias de Marketing' }
    ],
    creditos: 60,
    fecha_limite: '2024-05-15',
    numero_plazas: 5
  },
  {
    id_plan: '2',
    universidad_destino: 'Universidad de Sevilla',
    centro: 'Escuela Técnica Superior de Ingeniería Informática',
    grado: 'Grado en Ingeniería del Software',
    curso: '2º',
    tipo1: 'simple',
    tipo2: 'alumnado',
    asignaturas: [
      { origen: 'Estructuras de Datos', destino: 'Estructuras de Datos y Algoritmos' },
      { origen: 'Programación Orientada a Objetos', destino: 'Diseño y Programación Orientada a Objetos' }
    ],
    creditos: 30,
    fecha_limite: '2024-06-01',
    numero_plazas: 3
  },
  {
    id_plan: '3',
    universidad_destino: 'Universidad Complutense de Madrid',
    centro: 'Facultad de Medicina',
    grado: 'Grado en Medicina',
    curso: '4º',
    tipo1: 'anual',
    tipo2: 'alumnado',
    asignaturas: [
      { origen: 'Patología Médica I', destino: 'Medicina Interna I' },
      { origen: 'Patología Quirúrgica I', destino: 'Cirugía General' },
      { origen: 'Farmacología Clínica', destino: 'Farmacología y Terapéutica Médica' }
    ],
    creditos: 60,
    fecha_limite: '2024-04-30',
    numero_plazas: 2
  },
  {
    id_plan: '4',
    universidad_destino: 'Universidad Complutense de Madrid',
    centro: 'Facultad de Medicina',
    grado: 'Grado en Enfermeria',
    curso: '3º',
    tipo1: 'anual',
    tipo2: 'profesorado',
    asignaturas: [
      { origen: 'Patología Médica I', destino: 'Medicina Interna I' },
      { origen: 'Patología Quirúrgica I', destino: 'Cirugía General' },
      { origen: 'Farmacología Clínica', destino: 'Farmacología y Terapéutica Médica' }
    ],
    creditos: 60,
    fecha_limite: '2024-04-30',
    numero_plazas: 2
  }
]

export const savePlanes = (planes: Plan[]) => {
  localStorage.setItem('planes', JSON.stringify(planes))
}

export const loadPlanes = (): Plan[] => {
  const planesString = localStorage.getItem('planes')
  return planesString ? JSON.parse(planesString) : initialPlanes
}

export const saveSolicitudes = (solicitudes: Solicitud[]) => {
  localStorage.setItem('solicitudes', JSON.stringify(solicitudes))
}

export const loadSolicitudes = (dniUsuario: string): Solicitud[] => {
  const solicitudesString = localStorage.getItem('solicitudes')
  const todasLasSolicitudes = solicitudesString ? JSON.parse(solicitudesString) : []
  return todasLasSolicitudes.filter((solicitud: Solicitud) => solicitud.dni_usuario === dniUsuario)
}

export const loadAllSolicitudes = (): Solicitud[] => {
  const solicitudesString = localStorage.getItem('solicitudes');
  return solicitudesString ? JSON.parse(solicitudesString) : [];
};

