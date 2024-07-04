package org.projekat.pibp.controller;


import org.projekat.pibp.dto.ZauzetostDTO;
import org.projekat.pibp.model.Zauzetost;
import org.projekat.pibp.model.id.ZauzetostId;
import org.projekat.pibp.service.ZauzetostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/zauzetosti")
public class ZauzetostController {

    private final ZauzetostService zauzetostService;

    public ZauzetostController(ZauzetostService zauzetostService) {
        this.zauzetostService = zauzetostService;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<Zauzetost> dodajZauzetost(@RequestBody ZauzetostDTO zauzetostData) {
        Zauzetost novaZauzetost = zauzetostService.dodajZauzetost(zauzetostData);
        
        return new ResponseEntity<>(novaZauzetost, HttpStatus.CREATED);
    }

    @GetMapping("/sve")
    public ResponseEntity<List<Zauzetost>> prikaziSveZauzetosti() {
        List<Zauzetost> zauzetosti = zauzetostService.prikaziSveZauzetosti();
        return new ResponseEntity<>(zauzetosti, HttpStatus.OK);
    }

    @GetMapping("/{datum}/{vremeOd}/{brUc}")
    public ResponseEntity<Zauzetost> dobaviZauzetostPoId(@PathVariable("datum") String datum,
                                                         @PathVariable("vremeOd") Integer vremeOd,
                                                         @PathVariable("brUc") Integer brUc) {
        ZauzetostId id = new ZauzetostId(LocalDate.parse(datum), vremeOd, brUc);
        Zauzetost zauzetost = zauzetostService.dobaviZauzetostPoId(id);
        if (zauzetost != null) {
            return new ResponseEntity<>(zauzetost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

