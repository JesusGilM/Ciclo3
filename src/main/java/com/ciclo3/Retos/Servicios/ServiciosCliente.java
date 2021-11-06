/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Servicios;

import com.ciclo3.Retos.Modelo.Cliente;
import com.ciclo3.Retos.Repositorio.RepositorioCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author NFLopez
 */
@Service
public class ServiciosCliente {
    @Autowired
    private RepositorioCliente metodosCrud;
    
    public List<Cliente> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Cliente> getCliente(int clienteId){
        return metodosCrud.getCliente(clienteId);
    }
    
    public Cliente save(Cliente cliente){
        if(cliente.getIdClient()==null){
            return metodosCrud.save(cliente);
        }else{
            Optional<Cliente> e=metodosCrud.getCliente(cliente.getIdClient());
            if(e.isEmpty()){
                return metodosCrud.save(cliente);
            }else{
                return cliente;
            }
        }
    }    
    public Cliente update(Cliente cliente){
        if(cliente.getIdClient()!=null){
            Optional<Cliente> e=metodosCrud.getCliente(cliente.getIdClient());
            if(!e.isEmpty()){
                if(cliente.getEmail()!=null){
                    e.get().setEmail(cliente.getEmail());
                }
                if(cliente.getPassword()!=null){
                    e.get().setPassword(cliente.getPassword());
                }
                if(cliente.getName()!=null){
                    e.get().setName(cliente.getName());
                }
                if(cliente.getAge()!=null){
                    e.get().setAge(cliente.getAge());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return cliente;
            }
        }else{
            return cliente;
        }
    }
    
    public boolean deleteCliente(int clienteId){
        Boolean aBoolean = getCliente(clienteId).map(cliente -> {
            metodosCrud.delete(cliente);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
