'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticateUser } from './utils'

export default function LoginPage() {
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = authenticateUser(dni, password)
    if (user) {
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userDni', user.dni)
      switch (user.role) {
        case 'admin':
          router.push('/admin')
          break
        case 'alumno':
        case 'profesor':
          router.push('/user')
          break
      }
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96 border border-blue-200">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-900">Sistema SICUE</h1>
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="dni" className="block mb-1 text-blue-800">DNI:</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-blue-800">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-6">
          <a
            href="/all-plans"
            className="block w-full py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-center shadow-md"
          >
            Mostrar todos los planes
          </a>
        </div>
      </div>
    </div>
  )
}

