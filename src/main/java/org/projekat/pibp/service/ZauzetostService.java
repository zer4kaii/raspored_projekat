package org.projekat.pibp.service;

import org.projekat.pibp.model.Zauzetost;
import org.projekat.pibp.model.id.ZauzetostId;
import org.projekat.pibp.repository.ZauzetostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZauzetostService {

    private final ZauzetostRepository zauzetostRepository;

    @Autowired
    public ZauzetostService(ZauzetostRepository zauzetostRepository) {
        this.zauzetostRepository = zauzetostRepository;
    }

    public Zauzetost dodajZauzetost(Zauzetost zauzetost) {
        return zauzetostRepository.save(zauzetost);
    }

    public List<Zauzetost> prikaziSveZauzetosti() {
        return zauzetostRepository.findAll();
    }

    public Zauzetost dobaviZauzetostPoId(ZauzetostId id) {
        return zauzetostRepository.findById(id).orElse(null);
    }

}