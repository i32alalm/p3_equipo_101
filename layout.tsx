import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema SICUE',
  description: 'Sistema de gestión de solicitudes de planes de convalidación SICUE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>
        <nav className="bg-blue-900 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Soft-Manage Equipo_101</h1>
            <div className="flex items-center">
              <a href="/" className="text-white hover:bg-blue-800 px-4 py-2 rounded transition duration-300">
                Cambiar perfil / Iniciar sesión
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

