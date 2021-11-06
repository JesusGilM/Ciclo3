/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo3.Retos.Servicios;

import com.ciclo3.Retos.Modelo.Score;
import com.ciclo3.Retos.Repositorio.RepositorioScore;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author NFLopez
 */
@Service
public class ServiciosScore {

    @Autowired
    private RepositorioScore metodosCrud;

    public List<Score> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Score> getScore(int scoreId) {
        return metodosCrud.getScore(scoreId);
    }

    public Score save(Score score) {
        if (score.getStars() >= 0 && score.getStars() <= 5) {
            if (score.getIdScore() == null) {
                return metodosCrud.save(score);
            } else {
                Optional<Score> e = metodosCrud.getScore(score.getIdScore());
                if (e.isEmpty()) {
                    return metodosCrud.save(score);
                }
            }

        }
        return score;
    }

    public Score updateScore(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> e = metodosCrud.getScore(score.getIdScore());
            if (!e.isEmpty()) {
                if (score.getMessageText() != null) {
                    e.get().setMessageText(score.getMessageText());
                }
                if (score.getStars() != null && score.getStars() >= 0 && score.getStars() <= 5) {
                    e.get().setStars(score.getStars());
                }
                metodosCrud.save(e.get());
                return e.get();
            } else {
                return score;
            }
        } else {
            return score;
        }
    }

    public boolean deleteScore(int id) {

        Optional<Score> score = getScore(id);

        if (score.isEmpty()) {
            return false;
        } else {
            metodosCrud.delete(score.get());
            return true;
        }
    }
}
