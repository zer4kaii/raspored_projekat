package org.projekat.pibp.repository;

import org.projekat.pibp.model.Predavac;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PredavacRepository extends JpaRepository<Predavac,Long> {
    Optional<Predavac> findByKorisnickoIme(String korisnickoIme);
    Boolean existsByKorisnickoIme(String korisnickoIme);
    Optional<Predavac> findById(Long id);
}
