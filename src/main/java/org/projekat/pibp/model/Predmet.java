package org.projekat.pibp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
