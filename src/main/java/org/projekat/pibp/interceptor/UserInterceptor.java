package org.projekat.pibp.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.projekat.pibp.model.Korisnik;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Objects;

public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        // Check if the user is authenticated and is an admin
        if ((session.getAttribute("admin") == null) || (Objects.equals(((Korisnik) session.getAttribute("user")).getUloga(), "admin"))) {
            response.sendRedirect(request.getContextPath() + "/home"); // Redirect to login page
            return false; // Access not allowed
        }

        return true; // Allow access to the requested URL
    }
}
