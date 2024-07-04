package org.projekat.pibp.service;

import oracle.ucp.proxy.annotation.Pre;
import org.projekat.pibp.dto.AktivnostDTO;
import org.projekat.pibp.model.Aktivnost;
import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.model.Predmet;
import org.projekat.pibp.repository.AktivnostRepository;
import org.projekat.pibp.repository.PredavacRepository;
import org.projekat.pibp.repository.PredmetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Optional;

@Service
public class AktivnostService {

    private final AktivnostRepository aktivnostRepository;
    private final PredavacRepository predavacRepository;
    private final PredmetRepository predmetRepository;

    @Autowired
    public AktivnostService(AktivnostRepository aktivnostRepository, PredavacRepository predavacRepository, PredmetRepository predmetRepository) {
        this.aktivnostRepository = aktivnostRepository;
        this.predavacRepository = predavacRepository;
        this.predmetRepository = predmetRepository;
    }

    public Aktivnost dodajAktivnost(AktivnostDTO aktivnostData) {
        Aktivnost a = new Aktivnost();
        Predavac predo = predavacRepository.findById(aktivnostData.getPredavac_id()).orElseThrow(() -> new ResourceAccessException("Nema ovog resursa"));
        Predmet predmet = predmetRepository.findById(aktivnostData.getPredmet_id()).orElseThrow();
        a.setNaziv(aktivnostData.getNaziv());
        a.setRedovna(aktivnostData.isRedovna());

        a.setPredmet(predmet);
        a.setPredavac(predo);
        a.setTrajanje(aktivnostData.getTrajanje());
        a.setBroj_studenata(aktivnostData.getBroj_studenata());
        a.setTipAktivnosti(aktivnostData.getTip_aktivnosti());

        return aktivnostRepository.save(a);
    }

    public List<Aktivnost> prikaziSveAktivnosti() {
        return aktivnostRepository.findAll();
    }

    public Aktivnost dobaviAktivnostPoId(Long idAktivnosti) {
        return aktivnostRepository.findById(idAktivnosti).orElse(null);
    }
}
