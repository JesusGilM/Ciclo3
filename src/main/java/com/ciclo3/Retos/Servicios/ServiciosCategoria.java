/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Servicios;

import com.ciclo3.Retos.Modelo.Categoria;
import com.ciclo3.Retos.Repositorio.RepositorioCategoria;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author NFLopez
 */
@Service
public class ServiciosCategoria {
    @Autowired
    private RepositorioCategoria mCrCategoria;
    
    public List<Categoria> getAll(){
        return mCrCategoria.getAll();
    }
    
    public Optional<Categoria> getCategoria(int categoriaId){
        return mCrCategoria.getCategoria(categoriaId);
    }
    
    public Categoria save(Categoria categoria){
        if(categoria.getId()==null){
            return mCrCategoria.save(categoria);
        }else{
            Optional<Categoria> g=mCrCategoria.getCategoria(categoria.getId());
            if(g.isEmpty()){
                return mCrCategoria.save(categoria);
            }else{
                return categoria;
            }
        }
    }
    public Categoria update(Categoria categoria){
	if(categoria.getId()!=null){
            Optional<Categoria> g=mCrCategoria.getCategoria(categoria.getId());
            if(!g.isEmpty()){
		if(categoria.getDescription()!=null){
                    g.get().setDescription(categoria.getDescription());
		}
                if(categoria.getName()!=null){
                    g.get().setName(categoria.getName());
		}
                return mCrCategoria.save(g.get());
            }              
	}
        return categoria;
    }
    
    public boolean deleteCategoria(int categoriaId){
        Boolean bBoolean = getCategoria(categoriaId).map(categoria -> {
            mCrCategoria.delete(categoria);
            return true;
        }).orElse(false);
        return bBoolean;
    }
}
