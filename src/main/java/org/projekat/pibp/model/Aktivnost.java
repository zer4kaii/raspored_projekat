package org.projekat.pibp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "AKTIVNOSTI")
public class Aktivnost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aktivnosti")
    private Long idAktivnosti;

    @ManyToOne
    @JoinColumn(name = "id_predavaca", nullable = false)
    private Predavac predavac;

    @ManyToOne
    @JoinColumn(name = "id_predmeta", nullable = false)
    private Predmet predmet;

    @NotBlank(message = "Tip aktivnosti ne sme biti prazan")
    @Column(name = "tip_aktivnosti", nullable = false, length = 60)
    private String tipAktivnosti;

    @NotBlank(message = "Naziv ne sme biti prazan")
    @Column(name = "naziv", nullable = false, length = 60)
    private String naziv;

    @NotNull(message = "Redovna ne sme biti prazna")
    @Column(name = "redovna", nullable = false)
    private Boolean redovna;

    @NotNull(message = "Trajanje ne sme biti prazno")
    @Column(name = "trajanje", nullable = false)
    private Integer trajanje;


}
