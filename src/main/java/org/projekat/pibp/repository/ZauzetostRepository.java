package org.projekat.pibp.repository;


import org.projekat.pibp.model.Zauzetost;
import org.projekat.pibp.model.id.ZauzetostId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZauzetostRepository extends JpaRepository<Zauzetost, ZauzetostId> {
}
