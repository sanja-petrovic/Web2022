package controller;

import com.google.gson.Gson;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.servlet.http.HttpSession;  
import com.google.gson.GsonBuilder;

import beans.User;
import beans.UserType;
import dao.Repository;
import dao.UserDAO;
import dto.LoginUserDTO;
import dto.RegisterUserDTO;
import services.PasswordService;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

public class UserController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			login();
			logout();
			getCurrentlyLoggedInUser();
			getUsers();
			getUser();
			register();
		});
	}
	
	public static void login() {

		post("/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			LoginUserDTO u = gson.fromJson(payload, LoginUserDTO.class);
			
			User user = Repository.getInstance().getUserDAO().getUserById(u.getUsername().trim());
			
			if(user == null) {
				res.status(401);
				res.body("Incorrect username or password. Please try again");
				return res.body();
			} else if(!PasswordService.validatePassword(u.getPassword(), user.getPassword())) {
				res.status(401);
				res.body("Incorrect username or password. Please try again");
				return res.body();
			}
			System.out.println("logged in: " + user.getUsername());
			req.session().attribute("user", user);
			return gson.toJson(user);
		});
	}
	
	public static void logout() {
		post("/logout", (req, res) -> {
			res.type("application/json");
			req.session().removeAttribute("user");
			System.out.println("logging out!");
			res.status(200);
			return res.body();
		});
	}
	
	public static void getUsers() {
		get("/users", (req, res) -> {
			return gson.toJson(Repository.getInstance().getUserDAO().getUsers());
		});
	}
	
	public static void getCurrentlyLoggedInUser() {
		get("/loggedInUser", (req, res) -> {
			User user = req.session().attribute("user");
			return gson.toJson(user);
		});
	}
	
	
	public static void getUser() {
		get("/users/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			User user = Repository.getInstance().getUserDAO().getUserById(id);
			return gson.toJson(user);
		});
	}
	
	public static void register() {
		post("/register", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			RegisterUserDTO u = gson.fromJson(payload, RegisterUserDTO.class);
			
			User user = new User(u.getUsername(), PasswordService.generateStrongPasswordHash(u.getPassword()), u.getName(), u.getSurname(), u.parseGender(), u.parseDate(), UserType.BUYER);
			Repository.getInstance().getUserDAO().addUser(user);
			System.out.println(user);
			req.session().attribute("user", user);
			
			return gson.toJson(user);
		});
	}
	

}
