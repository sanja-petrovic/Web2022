package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import dao.Repository;
import dao.UserDAO;
import dto.LoginUserDTO;
import dto.RegisterUserDTO;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

public class UserController {
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static UserDAO userDAO = new UserDAO();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			login();
			getUsers();
			register();
		});
	}
	
	public static void login() {

		post("/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			LoginUserDTO u = gson.fromJson(payload, LoginUserDTO.class);
			
			User user = userDAO.getUserById(u.getUsername().trim());
			
			if(user == null) {
				res.status(401);
				res.body("Incorrect username or password. Please try again. attempted:" + u.getUsername() + " " + u.getPassword());
				return res.body();
			} else if(!user.getPassword().equals(u.getPassword())) {
				res.status(401);
				res.body("attempted: " + u.getUsername() + " " + u.getPassword());
				return res.body();
			}
			
			return gson.toJson(u);
		});
	}
	
	public static void getUsers() {
		get("/users", (req, res) -> {
			return gson.toJson(userDAO.getUsers());
		});
	}
	
	public static void getUser() {
		get("/user", (req, res) -> {
			String username = req.queryParams("username");
			Repository repository = Repository.getInstance();
			User user = repository.getUserDAO().getUserById(username);
			return gson.toJson(user);
		});
	}
	
	public static void register() {
		post("/register", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			RegisterUserDTO u = gson.fromJson(payload, RegisterUserDTO.class);
			
			User user = userDAO.getUserById(u.getUsername());
			
			if(user != null) {
				res.status(409);
				res.body("Username is taken.");
				return res.body();
			}
			
			user.setName(u.getName());
			user.setSurname(u.getSurname());
			user.setGender(u.getGender());
			user.setDateOfBirth(u.getDateOfBirth());
			user.setDeletedAt(null);
			user.setUsername(u.getUsername());
			user.setPassword(u.getPassword());
			
			return gson.toJson(u);
		});
	}
}
