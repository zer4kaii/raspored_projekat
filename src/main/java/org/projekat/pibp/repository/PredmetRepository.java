package org.projekat.pibp.repository;

import org.projekat.pibp.model.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredmetRepository extends JpaRepository<Predmet, Long> {
    //Kod za listu svih predmeta
    List<Predmet> findAll();
}
