/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Repositorio;

import com.ciclo3.Retos.Modelo.Game;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ciclo3.Retos.Interface.InterfaceGame;

/**
 *
 * @author NFLopez
 */
@Repository
public class RepositorioGame {
    @Autowired
    private InterfaceGame crudGame;
    
    public List<Game> getAll(){
        return (List<Game>) crudGame.findAll();
    }
    
    public Optional<Game> getGame(int id){
        return crudGame.findById(id);
    }
    
    public Game save(Game game){
        return crudGame.save(game);
    }
    
    public void delete(Game game){
        crudGame.delete(game);
    }
}
