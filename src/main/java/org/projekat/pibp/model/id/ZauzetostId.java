package org.projekat.pibp.model.id;



import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Embeddable
public class ZauzetostId implements Serializable {

    private LocalDate datum;
    private Integer vremeOd;
    private Integer brUc;

    public ZauzetostId() {
    }

    public ZauzetostId(LocalDate datum, Integer vremeOd, Integer brUc) {
        this.datum = datum;
        this.vremeOd = vremeOd;
        this.brUc = brUc;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public Integer getVremeOd() {
        return vremeOd;
    }

    public void setVremeOd(Integer vremeOd) {
        this.vremeOd = vremeOd;
    }

    public Integer getBrUc() {
        return brUc;
    }

    public void setBrUc(Integer brUc) {
        this.brUc = brUc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ZauzetostId that = (ZauzetostId) o;
        return Objects.equals(datum, that.datum) &&
                Objects.equals(vremeOd, that.vremeOd) &&
                Objects.equals(brUc, that.brUc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(datum, vremeOd, brUc);
    }
}

