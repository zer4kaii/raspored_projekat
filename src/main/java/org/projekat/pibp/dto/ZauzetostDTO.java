package org.projekat.pibp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.projekat.pibp.model.id.ZauzetostId;


@Getter
@Setter
@Data
public class ZauzetostDTO {
    private ZauzetostId id;
    private Integer vreme_do;
    private Long aktivnost_id;
}
