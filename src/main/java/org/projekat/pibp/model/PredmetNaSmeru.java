package org.projekat.pibp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.projekat.pibp.model.id.PredmetNaSmeruId;

@Getter
@Setter
@Entity
@Table(name="PREDMETI_NA_SMERU")
public class PredmetNaSmeru {
    @EmbeddedId
    private PredmetNaSmeruId id;

    @ManyToOne
    @MapsId("idS")
    @JoinColumn(name="id_s")
    private Smer smer;

    @ManyToOne
    @MapsId("idP")
    @JoinColumn(name = "id_p")
    private Predmet predmet;

    @Column(name = "tip", nullable = false, length = 50)
    private String tip;

    public PredmetNaSmeru() {}

    public PredmetNaSmeru(PredmetNaSmeruId id, Smer smer, Predmet predmet, String tip) {
        this.id = id;
        this.smer = smer;
        this.predmet = predmet;
        this.tip = tip;
    }

}
