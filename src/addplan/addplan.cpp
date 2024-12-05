#include<iostrem>
#include<string>
#include<stdlib>
#include<fstream>
#include <iomanip>
#include"../main/cabezero.h"




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

    std::cout << "Numero de asignaturas del plan: ";
    std::cin >> numAsignaturas;
    std::cin.ignore();

    ASD.resize(numAsignaturas);
    ASO.resize(numAsignaturas);
    for (int i = 0; i < numAsignaturas; ++i) {
        std::cout << "Asignatura de ORIGEN " << i + 1 << ": ";
        std::getline(std::cin, ASO[i]);
        std::cout << "Asignatura_DESTINO " << i + 1 << ": ";
        std::getline(std::cin, ASD[i]);
    }
    nuevoPlan.setASD(ASD);
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