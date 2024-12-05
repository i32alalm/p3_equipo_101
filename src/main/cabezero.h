#ifndef CABEZERO_H
#define CABEZERO_H



class Usuario {
private:
    std::string DNI_;
    std::string Nombre_;
    std::string Universidad_;
    std::string Centro_;
    std::string Carrera_;
    std::string Contraseña_;
    int ncreditos_;

public:

    // Getters
    std::string GetDNI() const { return DNI_; }
    std::string GetNombre() const { return Nombre_; }
    std::string GetUniversidad() const { return Universidad_; }
    int GetNCreditos() const { return ncreditos_; }
    std::string GetCentro(){return Centro_;}
    std::string GetCarrera(){return Carrera_;}

    // Setters
    void SetDNI(const std::string& DNI) { DNI_ = DNI; }
    void SetNombre(const std::string& Nombre) { Nombre_ = Nombre; }
    void SetUniversidad(const std::string& Universidad) { Universidad_ = Universidad; }
    void SetContraseña(const std::string& contraseña) { contraseña_ = contraseña; }
    void SetNCreditos(int ncreditos) { ncreditos_ = ncreditos; }
};

class plan{
  private:
    std::string ID_;
    std::string universidad_d_;
    int fecha_;
    std::vector<std::string> ASD_;
    std::vector<std::string> ASO_;
    int Curso_;
    std::string grado_;
    public:
      plan::plan();

      //setters
            void setID(std::string ID){ID_=ID;}
            void setUniversidadD(std::string D){universidad_d_=D;}
            void setFecha(int p){fecha_=p;}
            void setCurso(int c){Curso_=c;}
            void setGrado(std::string d){grado_=d;}
            void setASD(std::vector<std::string> os){ASD_=os;}
            void setASO(std::vector<std::string> as){ASO_=as;}

      //Geters
            std::string getID(){return ID_;}
            std::string getUniversidad(){return universidad_d_;}
            int getFecha(){return fecha_;}
            int getCurso(){return Curso_;}
            std::string getGrado(){return grado_;}
            std::vector<std::string> getASD(){return ASD_;}
            std::vector<std::string> getASO(){return ASO_;}

};

class Solicitud: Public Usuario, Public Plan{
        private:

    std::string ID_Solicitud_;
    std::string estado_;

        public:

    std::string GetID(){return ID_Solicitud_;}
    std::string GetEstado(){return estado_;}
}



// Mohamed Ibrahim Al Zein Al Zein 
void añadirPlan();
void filtrarPlanesPorGrado();







#endif
