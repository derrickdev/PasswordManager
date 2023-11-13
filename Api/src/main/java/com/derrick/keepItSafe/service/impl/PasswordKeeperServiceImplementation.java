package com.derrick.keepItSafe.service.impl;

import com.derrick.keepItSafe.entity.PasswordKeeperEntity;
import com.derrick.keepItSafe.repository.PasswordKeeperRepository;
import com.derrick.keepItSafe.service.PasswordKeeperService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PasswordKeeperServiceImplementation implements PasswordKeeperService {


    private final PasswordKeeperRepository passwordKeeperRepository;

    public PasswordKeeperServiceImplementation(PasswordKeeperRepository passwordKeeperRepository) {
        this.passwordKeeperRepository = passwordKeeperRepository;
    }

    @Override
    public List<PasswordKeeperEntity> findAllPasswords() {
        return passwordKeeperRepository.findAll();
    }

    @Override
    public Optional<PasswordKeeperEntity> findById(Long id) {
        return passwordKeeperRepository.findById(id);
    }

    @Override
    public PasswordKeeperEntity save(PasswordKeeperEntity passwordKeeperEntity) {
        return passwordKeeperRepository.save(passwordKeeperEntity) ;
    }

    @Override
    public PasswordKeeperEntity update(PasswordKeeperEntity passwordKeeperEntity) {
        return passwordKeeperRepository.save(passwordKeeperEntity);
    }

    @Override
    public void deleteById(long id) {
        passwordKeeperRepository.deleteById(id);
    }

    public List<PasswordKeeperEntity> search(String query) {
        return passwordKeeperRepository.searchByUrlContains(query);
    }
}
