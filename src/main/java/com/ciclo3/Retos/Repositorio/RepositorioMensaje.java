package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Interface.InterfaceMensaje;
import com.ciclo3.Retos.Modelo.Mensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioMensaje {
    @Autowired
    private InterfaceMensaje crudMensaje;
    
    public List<Mensaje> getAll(){
        return (List<Mensaje>) crudMensaje.findAll();
    }
    
    public Optional<Mensaje> getMensaje(int id){
        return crudMensaje.findById(id);
    }
    
    public Mensaje save(Mensaje mensaje){
        return crudMensaje.save(mensaje);
    }
    
    public void delete(Mensaje mensaje){
        crudMensaje.delete(mensaje);
    }
}