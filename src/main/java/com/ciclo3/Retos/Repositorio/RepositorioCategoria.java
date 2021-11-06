/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Interface.InterfaceCategoria;
import com.ciclo3.Retos.Modelo.Categoria;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioCategoria {
    @Autowired
    private InterfaceCategoria crudCategoria;
    
    public List<Categoria> getAll(){
        return (List<Categoria>) crudCategoria.findAll();
    }
    
    public Optional<Categoria> getCategoria(int id){
        return crudCategoria.findById(id);
    }
    
    public Categoria save(Categoria categoria){
        return crudCategoria.save(categoria);
    }
    
    public void delete(Categoria categoria){
        crudCategoria.delete(categoria);
    }
}
