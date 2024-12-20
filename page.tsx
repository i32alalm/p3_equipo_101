'use client'

import { useState, useEffect } from 'react'
import { Plan, Solicitud, UserRole } from '../types'
import { loadPlanes, loadSolicitudes, saveSolicitudes } from '../utils/storage'

export default function UserPage() {
  const [grado, setGrado] = useState('')
  const [curso, setCurso] = useState('')
  const [tipo1, setTipo1] = useState('')
  const [planes, setPlanes] = useState<Plan[]>([])
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showAllPlans, setShowAllPlans] = useState(false)
  const [userRole, setUserRole] = useState<{ role: UserRole; dni: string }>({ role: 'alumno', dni: '' })
  const [confirmSolicitud, setConfirmSolicitud] = useState<Plan | null>(null)
  const [confirmAnular, setConfirmAnular] = useState<string | null>(null)

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole
    const storedDni = localStorage.getItem('userDni') || ''
    setUserRole({ role: storedRole || 'alumno', dni: storedDni })
    setSolicitudes(loadSolicitudes(storedDni))
    const allPlanes = loadPlanes()
    setPlanes(filterPlanesByRole(allPlanes, storedRole || 'alumno'))
  }, [])

  const filterPlanesByRole = (planes: Plan[], role: UserRole) => {
    return planes.filter(plan => plan.tipo2 === (role === 'alumno' ? 'alumnado' : 'profesorado'))
  }

  const buscarPlanes = () => {
    const planesGuardados = loadPlanes()
    const planesFiltrados = filterPlanesByRole(planesGuardados, userRole.role).filter(p => 
      p.grado.toLowerCase().includes(grado.toLowerCase()) &&
      p.curso.includes(curso) &&
      (tipo1 === '' || p.tipo1 === tipo1)
    )
    setPlanes(showAllPlans ? planesFiltrados : planesFiltrados.slice(0, 10))
  }

  const agregarSolicitud = (plan: Plan) => {
    const nuevaSolicitud: Solicitud = {
      id_solicitud: Date.now().toString(),
      id_plan: plan.id_plan,
      dni_usuario: userRole.dni,
      estado: 'pendiente',
      fecha_solicitud: new Date().toISOString().split('T')[0]
    }
    const nuevasSolicitudes = [...solicitudes, nuevaSolicitud]
    setSolicitudes(nuevasSolicitudes)
    saveSolicitudes(nuevasSolicitudes)
    setConfirmSolicitud(null)
  }

  const anularSolicitud = (idSolicitud: string) => {
    const nuevasSolicitudes = solicitudes.map(s => 
      s.id_solicitud === idSolicitud ? { ...s, estado: 'anulada' } : s
    )
    setSolicitudes(nuevasSolicitudes)
    saveSolicitudes(nuevasSolicitudes)
    setConfirmAnular(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-emerald-600">Panel de Usuario SICUE</h1>
      
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Buscar Planes</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Grado"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            placeholder="Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={tipo1}
            onChange={(e) => setTipo1(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Tipo 1 (Todos)</option>
            <option value="simple">Simple</option>
            <option value="anual">Anual</option>
          </select>
          <button onClick={buscarPlanes} className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald-700 transition duration-300">
            Buscar
          </button>
          <button onClick={() => { setShowAllPlans(!showAllPlans); buscarPlanes(); }} className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition duration-300 font-bold">
            {showAllPlans ? 'Mostrar menos planes' : 'Mostrar todos los planes'}
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Planes Encontrados</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {planes.map(plan => (
            <div key={plan.id_plan} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-300">
              <h3 className="mb-2 text-xl font-bold text-emerald-600">{plan.universidad_destino} - {plan.grado}</h3>
              <p><span className="font-semibold">Centro:</span> {plan.centro}</p>
              <p><span className="font-semibold">Curso:</span> {plan.curso}</p>
              <p><span className="font-semibold">Tipo:</span> {plan.tipo1}, {plan.tipo2}</p>
              <p><span className="font-semibold">Créditos:</span> {plan.creditos}</p>
              <p><span className="font-semibold">Fecha límite:</span> {plan.fecha_limite}</p>
              <p><span className="font-semibold">Número de plazas:</span> {plan.numero_plazas}</p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-600 hover:text-white transition duration-300"
                >
                  Ver Detalles
                </button>
                <button 
                  onClick={() => setConfirmSolicitud(plan)}
                  className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald-700 transition duration-300"
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">{selectedPlan.universidad_destino} - {selectedPlan.grado}</h2>
            <h3 className="mb-2 font-semibold">Asignaturas:</h3>
            <ul className="mb-4">
              {selectedPlan.asignaturas.map((asig, index) => (
                <li key={index}>
                  {asig.origen} → {asig.destino}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setSelectedPlan(null)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">Mis Solicitudes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solicitudes.map(solicitud => (
            <div key={solicitud.id_solicitud} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-300">
              <p><span className="font-semibold">ID Solicitud:</span> {solicitud.id_solicitud}</p>
              <p><span className="font-semibold">ID Plan:</span> {solicitud.id_plan}</p>
              <p><span className="font-semibold">Estado:</span> {solicitud.estado}</p>
              <p><span className="font-semibold">Fecha de solicitud:</span> {solicitud.fecha_solicitud}</p>
              {solicitud.estado !== 'anulada' && (
                <button 
                  onClick={() => setConfirmAnular(solicitud.id_solicitud)}
                  className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
                >
                  Anular Solicitud
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {confirmSolicitud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Confirmar Solicitud</h2>
            <p>¿Estás seguro de que deseas solicitar el plan para {confirmSolicitud.universidad_destino} - {confirmSolicitud.grado}?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setConfirmSolicitud(null)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
              <button 
                onClick={() => agregarSolicitud(confirmSolicitud)}
                className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald-700 transition duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmAnular && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Confirmar Anulación</h2>
            <p>¿Estás seguro de que deseas anular esta solicitud?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setConfirmAnular(null)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
              <button 
                onClick={() => anularSolicitud(confirmAnular)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
              >
                Confirmar Anulación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

