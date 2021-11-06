/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Controlador;

import com.ciclo3.Retos.Modelo.Reservaciones;
import com.ciclo3.Retos.Reportes.ContadorClientes;
import com.ciclo3.Retos.Reportes.StatusReservas;
import com.ciclo3.Retos.Servicios.ServiciosReservaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author NFLopez
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ControladorReservaciones {
    @Autowired
    private ServiciosReservaciones serviciosReservaciones;

    @GetMapping("/all")
    public List<Reservaciones> getReservaciones() {
        return serviciosReservaciones.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservaciones> getReservaciones(@PathVariable("id") int reservacionesId) {
        return serviciosReservaciones.getReservaciones(reservacionesId);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservaciones save(@RequestBody Reservaciones reservaciones){
        return serviciosReservaciones.save(reservaciones);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservaciones update(@RequestBody Reservaciones reservaciones){
        return serviciosReservaciones.update(reservaciones);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservacionesId){
        return serviciosReservaciones.deleteReservaciones(reservacionesId);
    }
    
    @GetMapping("/report-status")
    public StatusReservas getReservas() {
        return serviciosReservaciones.getReporteStatusReservaciones();
    }

    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservaciones> getReservasTiempo(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo) {
        return serviciosReservaciones.getReportesTiempoReservaciones(dateOne, dateTwo);
    }

    @GetMapping("/report-clients")
    public List<ContadorClientes> getClientes() {
        return serviciosReservaciones.servicioTopClientes();
    }
}
