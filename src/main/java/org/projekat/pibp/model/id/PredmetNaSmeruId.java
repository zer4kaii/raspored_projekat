package org.projekat.pibp.model.id;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class PredmetNaSmeruId implements Serializable {
    @Column(name="id_s")
    private Long idS;
    @Column(name="id_p")
    private Long idP;

    public PredmetNaSmeruId() {}
    public PredmetNaSmeruId(Long idS, Long idP) {
        this.idS = idS;
        this.idP = idP;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || this.getClass() != obj.getClass()) return false;
        PredmetNaSmeruId pnsi = (PredmetNaSmeruId) obj;
        return Objects.equals(this.idS, pnsi.idS) && Objects.equals(this.idP, pnsi.idP);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idS,idP);
    }
}
