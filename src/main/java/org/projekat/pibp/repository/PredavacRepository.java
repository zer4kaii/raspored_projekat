package org.projekat.pibp.repository;

import org.projekat.pibp.model.Predavac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredavacRepository extends JpaRepository<Predavac,Long> {
}
