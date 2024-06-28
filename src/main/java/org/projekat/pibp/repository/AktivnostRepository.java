package org.projekat.pibp.repository;

import org.projekat.pibp.model.Aktivnost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AktivnostRepository extends JpaRepository<Aktivnost, Long> {
}