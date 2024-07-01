package org.projekat.pibp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class RegisterDto {
    private Long id_predavaca;
    private String ime;
    private String prezime;
    private String titula;
    private String korisnicko_ime;
    private String sifra;
    private String email;
}
