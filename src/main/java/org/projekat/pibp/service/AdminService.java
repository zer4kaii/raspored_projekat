package org.projekat.pibp.service;

import org.projekat.pibp.model.Admin;
import org.projekat.pibp.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin findById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    // Implement other methods as needed
}