package org.projekat.pibp.repository;

import org.projekat.pibp.model.Uloga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UlogaRepository extends JpaRepository<Uloga, Integer> {
    Optional<Uloga> findByNaziv(String naziv);
}
