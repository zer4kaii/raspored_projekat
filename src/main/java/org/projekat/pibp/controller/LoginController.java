package org.projekat.pibp.controller;


import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.projekat.pibp.dto.LoginDto;
import org.projekat.pibp.model.Korisnik;
import org.projekat.pibp.repository.KorisnikRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Objects;

@Controller
public class LoginController {

    @Resource
    private KorisnikRepository korisnikRepository;


    @RequestMapping(value = {"/home", "/index"}, method = RequestMethod.GET)
    public String index(Model m) {
        m.addAttribute("loginDto", new LoginDto());
        return "home"; //JSP - /WEB-INF/view/home.jsp
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String handleLogin(@ModelAttribute("loginDto") LoginDto loginDto, Model m, HttpSession session) {
        try {
            Korisnik user = korisnikRepository.findByKorisnickoIme(loginDto.getKorisnicko_ime());

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

    @RequestMapping(value = "/logout")
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
