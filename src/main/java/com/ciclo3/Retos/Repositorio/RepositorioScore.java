/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Interface.InterfaceScore;
import com.ciclo3.Retos.Modelo.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioScore {
    @Autowired
    private InterfaceScore crudScore;
    public List<Score> getAll(){
        return (List<Score>) crudScore.findAll();
    }
    public Optional<Score> getScore(int id){
        return crudScore.findById(id);
    }
    public Score save(Score score){
        return crudScore.save(score);
    }
    public void delete (Score score){
        crudScore.delete(score);
    }

}