package org.projekat.pibp.service;

import org.projekat.pibp.model.Predmet;
import org.projekat.pibp.repository.PredmetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

import java.util.List;

@Service
@Validated
public class PredmetService {

    private final PredmetRepository predmetRepository;
    public PredmetService(PredmetRepository predmetRepository){
        this.predmetRepository = predmetRepository;
    }

    public Predmet dodajPredmet(@Valid Predmet predmet) {
        return predmetRepository.save(predmet);
    }

    public List<Predmet> dobaviSvePredmete() {
        return predmetRepository.findAll();
    }

}