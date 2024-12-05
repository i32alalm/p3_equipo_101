#include<iostream>


int main() {
    int opcion;
    do {
        std::cout << "=== Gestion de Solicitudes SICUE ----<<<  101  >>>---===\n";
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