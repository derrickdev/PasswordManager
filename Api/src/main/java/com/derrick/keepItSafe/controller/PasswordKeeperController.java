package com.derrick.keepItSafe.controller;

import com.derrick.keepItSafe.entity.PasswordKeeperEntity;
import com.derrick.keepItSafe.service.impl.PasswordKeeperServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/password")
public class PasswordKeeperController {
    @Autowired
    private final PasswordKeeperServiceImplementation passwordKeeperService;

    // Encryption key (change this to your own secret key)
    private static final String SECRET_KEY = "7gXc9mQz5s8zAxF2";

    public PasswordKeeperController(PasswordKeeperServiceImplementation passwordKeeperService) {
        this.passwordKeeperService = passwordKeeperService;
    }

    @GetMapping
    public List<PasswordKeeperEntity> findAllPasswords() {
        return passwordKeeperService.findAllPasswords();
    }

    @GetMapping("/{id}")
    public Optional<PasswordKeeperEntity> findById(@PathVariable("id") Long id) {
        Optional<PasswordKeeperEntity> optionalEntity = passwordKeeperService.findById(id);
        optionalEntity.ifPresent(this::decryptPassword);
        return optionalEntity;
    }

    @PostMapping
    public PasswordKeeperEntity save(@RequestBody PasswordKeeperEntity passwordKeeperEntity) {
        encryptPassword(passwordKeeperEntity);
        return passwordKeeperService.save(passwordKeeperEntity);
    }

    @PutMapping
    public PasswordKeeperEntity update(@RequestBody PasswordKeeperEntity passwordKeeperEntity) {
        encryptPassword(passwordKeeperEntity);
        return passwordKeeperService.save(passwordKeeperEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable long id) {
        passwordKeeperService.deleteById(id);
    }

    @GetMapping("search")
    public ResponseEntity<List<PasswordKeeperEntity>> search(@RequestParam String query){
        return ResponseEntity.ok(passwordKeeperService.search(query));
    }
    private void encryptPassword(PasswordKeeperEntity entity) {
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedPassword = cipher.doFinal(entity.getPassword().getBytes(StandardCharsets.UTF_8));
            entity.setPassword(Base64.getEncoder().encodeToString(encryptedPassword));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void decryptPassword(PasswordKeeperEntity entity) {
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedPassword = cipher.doFinal(Base64.getDecoder().decode(entity.getPassword()));
            entity.setPassword(new String(decryptedPassword, StandardCharsets.UTF_8));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}




