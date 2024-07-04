package org.projekat.pibp.service;

import org.projekat.pibp.dto.ZauzetostDTO;
import org.projekat.pibp.model.Aktivnost;
import org.projekat.pibp.model.Zauzetost;
import org.projekat.pibp.model.id.ZauzetostId;
import org.projekat.pibp.repository.AktivnostRepository;
import org.projekat.pibp.repository.ZauzetostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZauzetostService {

    private final ZauzetostRepository zauzetostRepository;
    private final AktivnostRepository aktivnostRepository;

    @Autowired
    public ZauzetostService(ZauzetostRepository zauzetostRepository, AktivnostRepository aktivnostRepository) {
        this.zauzetostRepository = zauzetostRepository;
        this.aktivnostRepository = aktivnostRepository;
    }



    public Zauzetost dodajZauzetost(ZauzetostDTO zauzetostData) {
        Zauzetost z = new Zauzetost();
        Aktivnost aktivnost = aktivnostRepository.findById(zauzetostData.getAktivnost_id()).orElseThrow();
        z.setAktivnost(aktivnost);
        z.setId(zauzetostData.getId());
        z.setVremeDo(zauzetostData.getVreme_do());
        return zauzetostRepository.save(z);
    }

    public List<Zauzetost> prikaziSveZauzetosti() {
        return zauzetostRepository.findAll();
    }

    public Zauzetost dobaviZauzetostPoId(ZauzetostId id) {
        return zauzetostRepository.findById(id).orElse(null);
    }

}