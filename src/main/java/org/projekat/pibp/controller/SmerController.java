package org.projekat.pibp.controller;

import org.projekat.pibp.model.Smer;
import org.projekat.pibp.service.SmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/smerovi")
public class SmerController {
    private final SmerService smerService;

    public SmerController(SmerService smerService){
        this.smerService = smerService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Smer> dodajSmer(@RequestBody Smer smer) {
        Smer noviSmer = smerService.dodajSmer(smer);
        return new ResponseEntity<>(noviSmer, HttpStatus.CREATED);
    }

    @GetMapping("/svi")
    public ResponseEntity<List<Smer>> dobaviSveSmerove() {
        List<Smer> smerovi = smerService.dobaviSveSmerove();
        System.out.println(smerovi);
        return new ResponseEntity<>(smerovi, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Smer> dobaviSmerPoId(@PathVariable Long id) {
        Smer smer = smerService.dobaviSmerPoId(id);
        if (smer != null) {
            return new ResponseEntity<>(smer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
