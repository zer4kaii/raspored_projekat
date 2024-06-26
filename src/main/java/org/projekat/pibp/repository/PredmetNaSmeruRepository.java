package org.projekat.pibp.repository;

import org.projekat.pibp.model.PredmetNaSmeru;
import org.projekat.pibp.model.id.PredmetNaSmeruId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredmetNaSmeruRepository extends JpaRepository<PredmetNaSmeru, PredmetNaSmeruId> {
    //

    List<PredmetNaSmeru> findAll();
}
