/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Interface.InterfaceCliente;
import com.ciclo3.Retos.Modelo.Cliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioCliente {
    @Autowired
    private InterfaceCliente crudCliente;
    
    public List<Cliente> getAll(){
        return (List<Cliente>) crudCliente.findAll();
    }
    
    public Optional<Cliente> getCliente(int id){
        return crudCliente.findById(id);
    }
    
    public Cliente save(Cliente cliente){
        return crudCliente.save(cliente);
    }
    
    public void delete(Cliente cliente){
        crudCliente.delete(cliente);
    }
}
