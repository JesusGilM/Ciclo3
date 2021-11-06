/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Interface;

import com.ciclo3.Retos.Modelo.Score;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author NFLopez
 */
public interface InterfaceScore extends CrudRepository<Score, Integer>{
    
}
