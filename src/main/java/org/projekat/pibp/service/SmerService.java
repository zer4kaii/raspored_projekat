package org.projekat.pibp.service;

import org.projekat.pibp.model.Smer;
import org.projekat.pibp.repository.SmerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SmerService {
    private final SmerRepository smerRepository;

    public SmerService(SmerRepository smerRepository){
        this.smerRepository = smerRepository;
    }
    public Smer dodajSmer(Smer smer) {
        return smerRepository.save(smer);
    }

    public List<Smer> dobaviSveSmerove() {
        return smerRepository.findAll();
    }

    public Smer dobaviSmerPoId(Long idSmera) {
        return smerRepository.findById(idSmera).orElse(null);
    }
}
