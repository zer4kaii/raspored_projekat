package org.projekat.pibp.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="ucionice")
public class Ucionica {
    @Id
    @Column(name="broj")
    private Integer broj;

    @Column(name="naziv", nullable=false, length=30)
    @Size(max = 30)
    @NotBlank(message="Tip učionice ne sme biti prazan")
    private String naziv;

    @NotNull(message = "Kapacitet za kap_k ne sme biti prazan")
    @Column(name = "kap_k", nullable = false)
    private Integer kapK;

    @NotNull(message = "Kapacitet za kap_s ne sme biti prazan")
    @Column(name = "kap_s", nullable = false)
    private Integer kapS;


}
