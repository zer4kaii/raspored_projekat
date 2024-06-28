package org.projekat.pibp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="PREDAVACI")
public class Predavac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id")
    private Korisnik korisnik;

    private String titula;

    // Ostala polja specifična za predavača

    // Getters and setters, constructors...

}
