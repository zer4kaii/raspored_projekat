package org.projekat.pibp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "korisnici")
@Inheritance(strategy = InheritanceType.JOINED)
public class Korisnik {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true, nullable = false)
        private String korisnickoIme;

        @Column(nullable = false)
        private String sifra;

        @Column(nullable = false)
        private String ime;

        @Column(nullable = false)
        private String prezime;

        private String email;

        @Column(nullable = false)
        private String uloga; // može biti "ADMIN" ili "PREDAVAC"
}
