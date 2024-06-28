package org.projekat.pibp.service;

import org.projekat.pibp.model.Aktivnost;
import org.projekat.pibp.repository.AktivnostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AktivnostService {

    private final AktivnostRepository aktivnostRepository;

    @Autowired
    public AktivnostService(AktivnostRepository aktivnostRepository) {
        this.aktivnostRepository = aktivnostRepository;
    }

    public Aktivnost dodajAktivnost(Aktivnost aktivnost) {
        return aktivnostRepository.save(aktivnost);
    }

    public List<Aktivnost> prikaziSveAktivnosti() {
        return aktivnostRepository.findAll();
    }

    public Aktivnost dobaviAktivnostPoId(Long idAktivnosti) {
        return aktivnostRepository.findById(idAktivnosti).orElse(null);
    }
}
