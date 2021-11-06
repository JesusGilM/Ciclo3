/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Interface.InterfaceReservaciones;
import com.ciclo3.Retos.Modelo.Cliente;
import com.ciclo3.Retos.Modelo.Reservaciones;
import com.ciclo3.Retos.Reportes.ContadorClientes;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioReservaciones {
    @Autowired
    private InterfaceReservaciones crudReservaciones;
    
    public List<Reservaciones> getAll(){
        return (List<Reservaciones>) crudReservaciones.findAll();
    }
    
    public Optional<Reservaciones> getReservation(int id){
        return crudReservaciones.findById(id);
    }

    public Reservaciones save(Reservaciones reservaciones){
        return crudReservaciones.save(reservaciones);
    }
    
    public void delete(Reservaciones reservaciones){
        crudReservaciones.delete(reservaciones);
    }
    
    public List<Reservaciones> ReservacionStatus (String status){
        return crudReservaciones.findAllByStatus(status);
    }

    public List<Reservaciones> ReservacionTiempo (Date a, Date b){
        return crudReservaciones.findAllByStartDateAfterAndStartDateBefore(a, b);
    }

    public List<ContadorClientes> getTopClientes(){
        List<ContadorClientes> res=new ArrayList<>();
        List<Object[]>report = crudReservaciones.countTotalReservationsByClient();
        for(int i=0; i<report.size();i++){
            res.add(new ContadorClientes((Long)report.get(i)[1],(Cliente) report.get(i)[0]));

        }
        return res;
    }
}