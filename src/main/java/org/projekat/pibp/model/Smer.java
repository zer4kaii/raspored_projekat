package org.projekat.pibp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="smerovi")
public class Smer {
    @Id
    @Column(name="id_smera")
    private Long idSmera;

    @NotBlank(message="Naziv smera ne sme biti prazan")
    @Column(name = "naziv_smera", nullable = false, length = 50)
    private String nazivSmera;

    @NotNull(message="Broj studenata ne sme biti prazan")
    @Column(name="broj_studenata", nullable = false)
    private Integer brojStudenata;

    @NotNull(message = "Datum akreditacije ne sme biti prazan")
    @Column(name = "datum_akreditacije", nullable = false)
    private LocalDate datumAkreditacije;
}
