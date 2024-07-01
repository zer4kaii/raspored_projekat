package org.projekat.pibp.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.projekat.pibp.model.id.ZauzetostId;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "ZAUZETOSTI")
public class Zauzetost {

    @EmbeddedId
    private ZauzetostId id;

    @ManyToOne
    @JoinColumn(name = "aktivnost")
    private Aktivnost aktivnost;

    @NotNull(message = "Vreme do ne sme biti prazno")
    @Column(name = "vreme_do", nullable = false)
    private Integer vremeDo;

    public Zauzetost() {
    }

    public Zauzetost(ZauzetostId id, Aktivnost aktivnost, Integer vremeDo) {
        this.id = id;
        this.aktivnost = aktivnost;
        this.vremeDo = vremeDo;
    }
}

