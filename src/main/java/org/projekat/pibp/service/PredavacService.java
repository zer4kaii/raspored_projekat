package org.projekat.pibp.service;

import jakarta.validation.Valid;
import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.repository.PredavacRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class PredavacService {
    private final PredavacRepository predavacRepository;
    public PredavacService(PredavacRepository predavacRepository){
        this.predavacRepository = predavacRepository;
    }

    public Predavac dodajPredavaca(@Valid Predavac predavac) {
        return predavacRepository.save(predavac);
    }

    public List<Predavac> dobaviSvePredavace() {
        return predavacRepository.findAll();
    }
}
