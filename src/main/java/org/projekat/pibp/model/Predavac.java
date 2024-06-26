package org.projekat.pibp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @Column(name = "id_predavaca")
    private Long idPredavaca;

    @NotBlank(message = "Ime ne sme biti prazno")
    @Size(max = 30)
    @Column(name = "ime", nullable = false, length = 30)
    private String ime;

    @NotBlank(message = "Prezime ne sme biti prazno")
    @Size(max = 30)
    @Column(name = "prezime", nullable = false, length = 30)
    private String prezime;

    @NotBlank(message = "Titula ne sme biti prazna")
    @Size(max = 30)
    @Column(name = "titula", nullable = false, length = 30)
    private String titula;

    @NotBlank(message = "Šifra ne sme biti prazna")
    @Size(max = 6)
    @Column(name = "sifra", nullable = false, length = 6)
    private String sifra;

    @Column(name = "email", length = 60)
    private String email;

}
