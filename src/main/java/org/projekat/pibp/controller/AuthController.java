package org.projekat.pibp.controller;

import org.projekat.pibp.dto.AuthResponseDTO;
import org.projekat.pibp.dto.LoginDto;
import org.projekat.pibp.dto.RegisterDto;
import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.model.Uloga;
import org.projekat.pibp.repository.PredavacRepository;
import org.projekat.pibp.repository.UlogaRepository;
import org.projekat.pibp.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private PredavacRepository predavacRepository;
    private UlogaRepository ulogaRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PredavacRepository predavacRepository, UlogaRepository ulogaRepository, PasswordEncoder passwordEncoder, JWTGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.predavacRepository = predavacRepository;
        this.ulogaRepository = ulogaRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
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
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getKorisnicko_ime(), loginDto.getSifra()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);
        List<String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        String username = authentication.getName();
        return new ResponseEntity<>(new AuthResponseDTO(token, authorities, username), HttpStatus.OK);
    }
    @GetMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String newToken = tokenGenerator.generateToken(authentication);
        List<String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        String username = authentication.getName();
        return new ResponseEntity<>(new AuthResponseDTO(newToken, authorities, username), HttpStatus.OK);
    }
}
