package com.derrick.keepItSafe.repository;

import com.derrick.keepItSafe.entity.PasswordKeeperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PasswordKeeperRepository extends JpaRepository<PasswordKeeperEntity,Long > {

    List<PasswordKeeperEntity> searchByUrlContains(String query) ;
}
