package com.derrick.keepItSafe.service;

import com.derrick.keepItSafe.entity.PasswordKeeperEntity;

import java.util.List;
import java.util.Optional;

public interface PasswordKeeperService {
    List<PasswordKeeperEntity> findAllPasswords();
    Optional<PasswordKeeperEntity> findById(Long id);
    PasswordKeeperEntity save(PasswordKeeperEntity passwordKeeperEntity);
    PasswordKeeperEntity update(PasswordKeeperEntity passwordKeeperEntity);
    void deleteById(long id);

}
