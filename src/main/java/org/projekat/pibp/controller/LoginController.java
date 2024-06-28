package org.projekat.pibp.controller;


import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.projekat.pibp.dto.LoginDto;
import org.projekat.pibp.model.Korisnik;
import org.projekat.pibp.repository.KorisnikRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class LoginController {

    @Resource
    private KorisnikRepository korisnikRepository;


    @GetMapping("/home")
    public String index(Model m) {
        m.addAttribute("loginDto", new LoginDto());
        return "home"; //JSP - /WEB-INF/view/home.jsp
    }

    @PostMapping("/login")
    public String handleLogin(@ModelAttribute("loginDto") LoginDto loginDto, Model m, HttpSession session) {
        try {
            Korisnik user = korisnikRepository.findByKorisnickoIme(loginDto.getKorisnickoIme());

            if (!user.getSifra().equals(loginDto.getSifra())) {
                throw new RuntimeException("Password mismatch.");
            }

            if (Objects.equals(user.getUloga(), "admin")) {
                //add user detail in session (assign session to logged in user)
                addUserInSession(user, session);
                return "redirect:admin/dashboard";
            } else {
                //add user detail in session (assign session to logged in user)
                addUserInSession(user, session);
                return "redirect:user/dashboard";
            }
        } catch (
                Exception ex) {
            //add error message and go back to login-form
            m.addAttribute("err", ex.getMessage());
            return "home";//JSP - Login FORM
        }

    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:home";
    }

    private void addUserInSession(Korisnik u, HttpSession session) {
        session.setAttribute("user", u);
        session.setAttribute("userId", u.getKorisnickoIme());
        session.setAttribute("admin", Objects.equals(u.getUloga(), "admin"));
    }
}
