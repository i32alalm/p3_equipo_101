import { User } from './types';

// Simula una base de datos de usuarios
const users: User[] = [
  { dni: 'i32alalm', password: 'i32alalm', role: 'alumno' },
  { dni: 'i32elelk', password: 'i32elelk', role: 'profesor' },
  { dni: 'p32arard', password: 'p32arard', role: 'admin' },
];

export const authenticateUser = (dni: string, password: string): User | null => {
  const user = users.find(u => u.dni === dni && u.password === password);
  return user || null;
};

