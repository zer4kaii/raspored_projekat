package org.projekat.pibp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="PREDMETI")
public class Predmet {
    @Id
    @Column(name = "id_predmeta")
    private Long idPredmeta;

    @NotBlank(message="Naziv predmeta ne sme da bude prazan!")
    @Column(name = "naziv_predmeta", nullable = false)
    private String nazivPredmeta;

    @NotNull(message="Ne sme da bude prazan broj studenata")
    @Column(name = "broj_studenata", nullable = false)
    private int brojStudenata;

}
