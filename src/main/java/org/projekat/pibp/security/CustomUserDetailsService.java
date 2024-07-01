package org.projekat.pibp.security;

import org.projekat.pibp.model.Predavac;
import org.projekat.pibp.model.Uloga;
import org.projekat.pibp.repository.PredavacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private PredavacRepository predavacRepository;

    @Autowired
    public CustomUserDetailsService(PredavacRepository predavacRepository) {
        this.predavacRepository = predavacRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Predavac user = predavacRepository.findByKorisnickoIme(username).orElseThrow(()-> new UsernameNotFoundException("Korisnicko ime nije pronadjeno"));
        return new User(user.getKorisnickoIme(), user.getSifra(), mapUlogeToAuthorities(user.getUloge()));


    }
    private Collection<GrantedAuthority> mapUlogeToAuthorities(List<Uloga> uloge){
        return uloge.stream().map(uloga-> new SimpleGrantedAuthority(uloga.getNaziv())).collect(Collectors.toList());
    }
}
