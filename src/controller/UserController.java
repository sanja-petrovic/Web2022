package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import beans.UserType;
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
			getUser();
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
			System.out.println("logged in: " + user.getUsername());
			return gson.toJson(user);
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
			
			User user = new User(u.getUsername(), u.getPassword(), u.getName(), u.getSurname(), u.parseGender(), u.parseDate(), UserType.BUYER);
			Repository repository = Repository.getInstance();
			repository.getUserDAO().addUser(user);
			
			System.out.println(user);
			return gson.toJson(user);
		});
	}

}
