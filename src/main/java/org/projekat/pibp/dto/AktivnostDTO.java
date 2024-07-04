package org.projekat.pibp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AktivnostDTO {
    private Long predavac_id;
    private Long predmet_id;
    private String tip_aktivnosti;
    private Long broj_studenata;
    private String naziv;
    private boolean redovna;
    private int trajanje;
}
