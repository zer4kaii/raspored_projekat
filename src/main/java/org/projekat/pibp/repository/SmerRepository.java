package org.projekat.pibp.repository;

import org.projekat.pibp.model.Smer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SmerRepository extends JpaRepository<Smer, Long> {
}
