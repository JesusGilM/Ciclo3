/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Servicios;

import com.ciclo3.Retos.Modelo.Mensaje;
import com.ciclo3.Retos.Repositorio.RepositorioMensaje;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
    * @author NFLopez
 */
@Service
public class ServiciosMensaje {
    @Autowired
    private RepositorioMensaje metodosCrud;
    
    public List<Mensaje> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Mensaje> getMensaje(int mensajeId){
        return metodosCrud.getMensaje(mensajeId);
    }
    
    public Mensaje save(Mensaje mensaje){
        if(mensaje.getIdMessage()==null){
            return metodosCrud.save(mensaje);
        }else{
            Optional<Mensaje> e=metodosCrud.getMensaje(mensaje.getIdMessage());
            if(e.isEmpty()){
                return metodosCrud.save(mensaje);
            }else{
                return mensaje;
            }
        }
    }
    
    public Mensaje update(Mensaje mensaje){
        if(mensaje.getIdMessage()!=null){
            Optional<Mensaje> e=metodosCrud.getMensaje(mensaje.getIdMessage());
            if(!e.isEmpty()){
                if(mensaje.getMessageText()!=null){
                    e.get().setMessageText(mensaje.getMessageText());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return mensaje;
            }
        }else{
            return mensaje;
        }
    }
    
    public boolean deleteMensaje (int mensajeID){
        Boolean aBoolean = getMensaje(mensajeID).map(mensaje -> {
            metodosCrud.delete(mensaje);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
