package org.projekat.pibp.service;

import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.repository.PredavacRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class PredavacService {

    private final PredavacRepository predavacRepository;
    public PredavacService(PredavacRepository predavacRepository){
        this.predavacRepository = predavacRepository;
    }

    public Predavac dodajPredavac(@Valid Predavac predavac) {
        return predavacRepository.save(predavac);
    }

    public List<Predavac> dobaviSvePredavace() {
        return predavacRepository.findAll();
    }

    public Optional<Predavac> dobaviPredavacaPoUsername(String korisnickoIme){
        return predavacRepository.findByKorisnickoIme(korisnickoIme);
    }

}