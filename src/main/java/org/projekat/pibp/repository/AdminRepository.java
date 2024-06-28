package org.projekat.pibp.repository;

import org.projekat.pibp.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Dodatne metode ako su potrebne
}
