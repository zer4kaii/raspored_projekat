package org.projekat.pibp.service;

import org.projekat.pibp.model.PredmetNaSmeru;
import org.projekat.pibp.model.id.PredmetNaSmeruId;
import org.projekat.pibp.repository.PredmetNaSmeruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredmetNaSmeruService {

    private final PredmetNaSmeruRepository predmetNaSmeruRepository;

    public PredmetNaSmeruService(PredmetNaSmeruRepository predmetNaSmeruRepository) {
        this.predmetNaSmeruRepository = predmetNaSmeruRepository;
    }

    public PredmetNaSmeru dodajPredmetNaSmeru(PredmetNaSmeru predmetiNaSmeru) {
        return predmetNaSmeruRepository.save(predmetiNaSmeru);
    }

    public List<PredmetNaSmeru> dobaviSvePredmeteNaSmeru() {
        return predmetNaSmeruRepository.findAll();
    }

    public PredmetNaSmeru dobaviPredmetNaSmeruPoId(PredmetNaSmeruId id) {
        return predmetNaSmeruRepository.findById(id).orElse(null);
    }

}