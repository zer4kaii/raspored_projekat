package org.projekat.pibp.controller;

import org.projekat.pibp.dto.LoginDto;
import org.projekat.pibp.dto.RegisterDto;
import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.model.Uloga;
import org.projekat.pibp.repository.PredavacRepository;
import org.projekat.pibp.repository.UlogaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private PredavacRepository predavacRepository;
    private UlogaRepository ulogaRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PredavacRepository predavacRepository, UlogaRepository ulogaRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.predavacRepository = predavacRepository;
        this.ulogaRepository = ulogaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if(predavacRepository.existsByKorisnickoIme(registerDto.getKorisnicko_ime())) {
            return new ResponseEntity<>("Korisnicko ime je zauzeto!", HttpStatus.BAD_REQUEST);
        }
        Predavac user = new Predavac();
        user.setKorisnickoIme(registerDto.getKorisnicko_ime());
        user.setId(registerDto.getId_predavaca());
        user.setIme(registerDto.getIme());
        user.setEmail(registerDto.getEmail());
        user.setPrezime(registerDto.getPrezime());
        user.setTitula(registerDto.getTitula());
        user.setSifra(passwordEncoder.encode(registerDto.getSifra()));

        Uloga uloge = ulogaRepository.findByNaziv("USER").get();
        user.setUloge(Collections.singletonList(uloge));

        predavacRepository.save(user);
        return new ResponseEntity<>("Uspesno registrovan predavac!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getKorisnicko_ime(), loginDto.getSifra()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("Uspesno ulogovan predavac!", HttpStatus.OK);
    }
}
