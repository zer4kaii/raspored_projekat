package org.projekat.pibp.model;

import javax.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "predavaci")
@Data
@NoArgsConstructor
public class Predavac {

        @Id
        @Column(name="id_predavaca")
        private Long id;

        @Column(name="ime", nullable = false)
        private String ime;

        @Column(name="prezime", nullable = false)
        private String prezime;

        @Column(name="titula", nullable = false)
        private String titula;

        @Column(name="korisnicko_ime", unique = true, nullable = false)
        private String korisnickoIme;

        @Column(name="sifra", nullable = false)
        private String sifra;

        @Column(name="email")
        private String email;

        @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        @JoinTable(name = "predavac_uloge", joinColumns = @JoinColumn(name="predavac_id", referencedColumnName = "id_predavaca"),
                inverseJoinColumns = @JoinColumn(name = "uloga_id", referencedColumnName = "id"))
        private List<Uloga> uloge = new ArrayList<>();


}
