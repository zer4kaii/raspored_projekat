package org.projekat.pibp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoginDto {
    private String korisnicko_ime;
    private String sifra;
}
