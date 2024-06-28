package org.projekat.pibp.repository;


import org.projekat.pibp.model.Ucionica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UcionicaRepository extends JpaRepository<Ucionica, Integer> {
}
