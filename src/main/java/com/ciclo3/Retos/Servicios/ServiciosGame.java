/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Servicios;

import com.ciclo3.Retos.Modelo.Game;
import com.ciclo3.Retos.Repositorio.RepositorioGame;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author NFLopez
 */
@Service
public class ServiciosGame {
    @Autowired
    private RepositorioGame mCrGame;
    
    public List<Game> getAll(){
        return mCrGame.getAll();
    }
    
    public Optional<Game> getGame(int gameId){
        return mCrGame.getGame(gameId);
    }
    
    public Game save(Game game){
        if(game.getId()==null){
            return mCrGame.save(game);
        }else{
            Optional<Game> e=mCrGame.getGame(game.getId());
            if(e.isEmpty()){
                return mCrGame.save(game);
            }else{
                return game;
            }
        }
    }
    
    public Game update(Game game){
	if(game.getId()!=null){
            Optional<Game> e=mCrGame.getGame(game.getId());
            if(!e.isEmpty()){
		if(game.getName()!=null){
                    e.get().setName(game.getName());
		}
                if(game.getDeveloper()!=null){
                    e.get().setDeveloper(game.getDeveloper());
		}
                if(game.getYear()!=null){
                    e.get().setYear(game.getYear());
		}
                if(game.getDescription()!=null){
                    e.get().setDescription(game.getDescription());
		}
                if(game.getCategory()!=null){
                    e.get().setCategory(game.getCategory());
		}
                mCrGame.save(e.get());
                return e.get();
            }else{
                return game;                
            }
	}else{
            return game;
        }
    }
    
    public boolean deleteGame(int gameId){
        Boolean aBoolean = getGame(gameId).map(game -> {
            mCrGame.delete(game);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}