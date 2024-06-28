package org.projekat.pibp.service;

import org.projekat.pibp.model.Ucionica;
import org.projekat.pibp.repository.UcionicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UcionicaService {

    private final UcionicaRepository ucionicaRepository;

    @Autowired
    public UcionicaService(UcionicaRepository ucionicaRepository) {
        this.ucionicaRepository = ucionicaRepository;
    }

    public Ucionica dodajUcionicu(Ucionica ucionica) {
        return ucionicaRepository.save(ucionica);
    }

    public List<Ucionica> prikaziSveUcionice() {
        return ucionicaRepository.findAll();
    }

    public Ucionica dobaviUcionicuPoBroju(Integer broj) {
        return ucionicaRepository.findById(broj).orElse(null);
    }
}