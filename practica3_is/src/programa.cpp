#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <iomanip>
#include "cabezero.h"

const std::string DATA_PATH = "../datos/";

// Prototipos de funciones
void añadirPlan();
void filtrarPlanesPorGrado();
void añadirSolicitud();
void anularSolicitud();
void mostrarEstadoSolicitud();

int main() {
    int opcion;
    do {
        std::cout << "=== Gestion de Solicitudes ===\n";
        std::cout << "1. Añadir Plan\n";
        std::cout << "2. Filtrar Planes por Grado\n";
        std::cout << "3. Añadir Solicitud\n";
        std::cout << "4. Anular Solicitud\n";
        std::cout << "5. Mostrar Estado de una Solicitud\n";
        std::cout << "0. Salir\n";
        std::cout << "Seleccione una opcion: ";
        std::cin >> opcion;

        switch (opcion) {
            case 1: añadirPlan(); break;
            case 2: filtrarPlanesPorGrado(); break;
            case 3: añadirSolicitud(); break;
            case 4: anularSolicitud(); break;
            case 5: mostrarEstadoSolicitud(); break;
            case 0: std::cout << "Saliendo...\n"; break;
            default: std::cout << "Opcion invalida, intente de nuevo.\n";
        }
    } while (opcion != 0);

    return 0;
}

// Funciones

void añadirPlan() {
    plan nuevoPlan;
    std::string ID, universidad, grado;
    int fecha, curso;
    std::vector<std::string> ASD, ASO;
    int numAsignaturas;

    std::cin.ignore();
    std::cout << "Introduzca el ID del Plan: ";
    std::getline(std::cin, ID);
    nuevoPlan.setID(ID);

    std::cout << "Introduzca la universidad destino: ";
    std::getline(std::cin, universidad);
    nuevoPlan.setUniversidadD(universidad);

    std::cout << "Introduzca el año (fecha): ";
    std::cin >> fecha;
    nuevoPlan.setFecha(fecha);

    std::cout << "Introduzca el curso: ";
    std::cin >> curso;
    nuevoPlan.setCurso(curso);

    std::cin.ignore();
    std::cout << "Introduzca el grado: ";
    std::getline(std::cin, grado);
    nuevoPlan.setGrado(grado);

    std::cout << "Numero de asignaturas disponibles (ASD): ";
    std::cin >> numAsignaturas;
    std::cin.ignore();

    ASD.resize(numAsignaturas);
    for (int i = 0; i < numAsignaturas; ++i) {
        std::cout << "Asignatura " << i + 1 << ": ";
        std::getline(std::cin, ASD[i]);
    }
    nuevoPlan.setASD(ASD);

    std::cout << "Numero de asignaturas obligatorias (ASO): ";
    std::cin >> numAsignaturas;
    std::cin.ignore();

    ASO.resize(numAsignaturas);
    for (int i = 0; i < numAsignaturas; ++i) {
        std::cout << "Asignatura " << i + 1 << ": ";
        std::getline(std::cin, ASO[i]);
    }
    nuevoPlan.setASO(ASO);

    std::ofstream file(DATA_PATH + "planes.bin", std::ios::binary | std::ios::app);
    if (!file) {
        std::cerr << "Error al abrir el archivo de planes.\n";
        return;
    }

    file.write(reinterpret_cast<const char*>(&nuevoPlan), sizeof(plan));
    file.close();
    std::cout << "Plan añadido correctamente.\n";
}

void filtrarPlanesPorGrado() {
    std::string gradoBuscado;
    std::cout << "Introduzca el grado a buscar: ";
    std::cin.ignore();
    std::getline(std::cin, gradoBuscado);

    std::ifstream file(DATA_PATH + "planes.bin", std::ios::binary);
    if (!file) {
        std::cerr << "Error al abrir el archivo de planes.\n";
        return;
    }

    plan p;
    bool encontrado = false;
    while (file.read(reinterpret_cast<char*>(&p), sizeof(plan))) {
        if (p.getGrado() == gradoBuscado) {
            std::cout << "ID: " << p.getID() << ", Universidad: " << p.getUniversidad()
                      << ", Fecha: " << p.getFecha() << ", Curso: " << p.getCurso() << "\n";

            const auto& ASO = p.getASO();
            const auto& ASD = p.getASD();
            size_t maxAsignaturas = std::max(ASO.size(), ASD.size());

            for (size_t i = 0; i < maxAsignaturas; ++i) {
                std::string aso = (i < ASO.size()) ? ASO[i] : "N/A";
                std::string asd = (i < ASD.size()) ? ASD[i] : "N/A";
                std::cout << "ASO[" << i + 1 << "] --- ASD[" << i + 1 << "]: " << aso << " --- " << asd << "\n";
            }

            encontrado = true;
        }
    }

    if (!encontrado) {
        std::cout << "No se encontraron planes para el grado especificado.\n";
    }

    file.close();
}


void añadirSolicitud() {
    std::string DNI, contraseña, planID;
    std::cin.ignore();
    std::cout << "Introduzca su DNI: ";
    std::getline(std::cin, DNI);

    std::cout << "Introduzca su contraseña: ";
    std::getline(std::cin, contraseña);

    // Comprobar usuario
    Usuario usuario;
    std::ifstream usuariosFile(DATA_PATH + "usuarios.bin", std::ios::binary);
    bool usuarioEncontrado = false;

    if (!usuariosFile) {
        std::cerr << "Error al abrir el archivo de usuarios.\n";
        return;
    }

    while (usuariosFile.read(reinterpret_cast<char*>(&usuario), sizeof(Usuario))) {
        if (usuario.GetDNI() == DNI && usuario.GetContraseña() == contraseña) {
            usuarioEncontrado = true;
            break;
        }
    }
    usuariosFile.close();

    if (!usuarioEncontrado) {
        std::cout << "Usuario o contraseña incorrectos.\n";
        return;
    }

    // Seleccionar plan
    std::cout << "Introduzca el ID del plan: ";
    std::getline(std::cin, planID);

    plan p;
    std::ifstream planesFile(DATA_PATH + "planes.bin", std::ios::binary);
    bool planEncontrado = false;

    if (!planesFile) {
        std::cerr << "Error al abrir el archivo de planes.\n";
        return;
    }

    while (planesFile.read(reinterpret_cast<char*>(&p), sizeof(plan))) {
        if (p.getID() == planID) {
            planEncontrado = true;
            break;
        }
    }
    planesFile.close();

    if (!planEncontrado) {
        std::cout << "Plan no encontrado.\n";
        return;
    }

    // Crear solicitud
    Solicitud solicitud;
    solicitud.SetID(planID);
    solicitud.SetEstado("Registrada");

    std::ofstream solicitudesFile(DATA_PATH + "solicitudes.bin", std::ios::binary | std::ios::app);
    if (!solicitudesFile) {
        std::cerr << "Error al abrir el archivo de solicitudes.\n";
        return;
    }

    solicitudesFile.write(reinterpret_cast<const char*>(&solicitud), sizeof(Solicitud));
    solicitudesFile.close();

    std::cout << "Solicitud añadida correctamente.\n";
}


void anularSolicitud() {
    std::string IDSolicitud, contraseña;
    std::cin.ignore();
    std::cout << "Introduzca el ID de la solicitud: ";
    std::getline(std::cin, IDSolicitud);

    std::cout << "Introduzca su contraseña: ";
    std::getline(std::cin, contraseña);

    std::ifstream fileIn(DATA_PATH + "solicitudes.bin", std::ios::binary);
    std::ofstream fileOut(DATA_PATH + "temp.bin", std::ios::binary);

    if (!fileIn || !fileOut) {
        std::cerr << "Error al abrir los archivos.\n";
        return;
    }

    Solicitud solicitud;
    bool encontrado = false;

    while (fileIn.read(reinterpret_cast<char*>(&solicitud), sizeof(Solicitud))) {
        if (solicitud.GetID() == IDSolicitud) {
            encontrado = true;
            Usuario usuario; // Validar la contraseña con el usuario asociado
            std::ifstream usuariosFile(DATA_PATH + "usuarios.bin", std::ios::binary);

            while (usuariosFile.read(reinterpret_cast<char*>(&usuario), sizeof(Usuario))) {
                if (usuario.GetDNI() == solicitud.GetDNI() && usuario.GetContraseña() == contraseña) {
                    solicitud.SetEstado("Anulada");
                    std::cout << "Solicitud anulada correctamente.\n";
                } else {
                    std::cerr << "Contraseña incorrecta.\n";
                }
            }
            usuariosFile.close();
        }
        fileOut.write(reinterpret_cast<const char*>(&solicitud), sizeof(Solicitud));
    }

    fileIn.close();
    fileOut.close();

    if (!encontrado) {
        std::cout << "No se encontró la solicitud con el ID proporcionado.\n";
    } else {
        std::remove((DATA_PATH + "solicitudes.bin").c_str());
        std::rename((DATA_PATH + "temp.bin").c_str(), (DATA_PATH + "solicitudes.bin").c_str());
    }
}


void mostrarEstadoSolicitud() {
    std::string IDSolicitud, contraseña;
    std::cin.ignore();
    std::cout << "Introduzca el ID de la solicitud: ";
    std::getline(std::cin, IDSolicitud);

    std::cout << "Introduzca su contraseña: ";
    std::getline(std::cin, contraseña);

    std::ifstream file(DATA_PATH + "solicitudes.bin", std::ios::binary);
    if (!file) {
        std::cerr << "Error al abrir el archivo de solicitudes.\n";
        return;
    }

    Solicitud solicitud;
    bool encontrado = false;

    while (file.read(reinterpret_cast<char*>(&solicitud), sizeof(Solicitud))) {
        if (solicitud.GetID() == IDSolicitud) {
            encontrado = true;
            Usuario usuario;
            std::ifstream usuariosFile(DATA_PATH + "usuarios.bin", std::ios::binary);

            while (usuariosFile.read(reinterpret_cast<char*>(&usuario), sizeof(Usuario))) {
                if (usuario.GetDNI() == solicitud.GetDNI() && usuario.GetContraseña() == contraseña) {
                    std::cout << "=== Detalles de la Solicitud ===\n";
                    std::cout << "ID Solicitud: " << solicitud.GetID() << "\n";
                    std::cout << "Estado: " << solicitud.GetEstado() << "\n";
                    std::cout << "DNI Usuario: " << solicitud.GetDNI() << "\n";
                    std::cout << "ID Plan: " << solicitud.GetIDPlan() << "\n";
                }
            }

            usuariosFile.close();
        }
    }

    if (!encontrado) {
        std::cout << "No se encontró la solicitud con el ID proporcionado o contraseña incorrecta.\n";
    }

    file.close();
}
