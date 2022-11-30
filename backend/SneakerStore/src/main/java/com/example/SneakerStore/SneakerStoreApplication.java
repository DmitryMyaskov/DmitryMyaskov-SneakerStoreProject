package com.example.SneakerStore;

import com.example.SneakerStore.dao.AuthorityDao;
import com.example.SneakerStore.dao.UserDao;
import com.example.SneakerStore.domain.Authority;
import com.example.SneakerStore.domain.User;
import com.example.SneakerStore.service.CustomUserService;
import org.h2.tools.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

@SpringBootApplication
public class SneakerStoreApplication {
	@Autowired
	private UserDao userDao;

	@Autowired
	private AuthorityDao authorityDao;

	@Autowired
	private CustomUserService customUserService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(SneakerStoreApplication.class, args);
		Console.main();
	}

	@PostConstruct
	protected void init(){
		Authority userU = new Authority();
		userU.setRole("USER");
		Authority userA = new Authority();
		userA.setRole("ADMIN");
		authorityDao.save(userU);
		authorityDao.save(userA);


		Authority loadU = authorityDao.findByRole("USER");
		Authority loadA = authorityDao.findByRole("ADMIN");

		System.out.println(loadA.getId());


		User user = new User();
		user.setId(1L);
		user.setUsername("dimaM");
		user.setPassword(passwordEncoder.encode("use12345"));
		user.addAuthority(loadU);

		customUserService.createCart(user);

		userDao.save(user);

//
		User admin = new User();
		admin.setUsername("ritaM");
		admin.setPassword(passwordEncoder.encode("use54321"));
		admin.setId(2L);
		admin.addAuthority(loadA);
		admin.addAuthority(loadU);

		customUserService.createCart(admin);

		userDao.save(admin);

	}

}
