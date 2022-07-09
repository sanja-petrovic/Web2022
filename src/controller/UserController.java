package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import dao.Repository;
import dto.LoginUserDTO;
import dto.ProfileDTO;
import dto.RegisterUserDTO;
import services.PasswordService;
import services.UserService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;
import static spark.Spark.put;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class UserController {
	private static Gson gson = new GsonBuilder().setPrettyPrinting()
			.registerTypeAdapter(LocalTime.class, new LocalTimeAdapter())
			.registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
			.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";

	public UserController() {
	}

	public void init() {
		path(basePath, () -> {
			login();
			logout();
			getCurrentlyLoggedInUser();
			getUsers();
			getUser();
			register();
			updateProfile();
			deleteUser();
		});
	}

	public static void login() {

		post("/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			LoginUserDTO u = gson.fromJson(payload, LoginUserDTO.class);

			User user = UserService.getCompleteData(u.getUsername());

			if (user == null || user.getDeletedAt() != null) {
				res.status(401);
				res.body("Incorrect username or password. Please try again");
				return res.body();
			} else if (!PasswordService.validatePassword(u.getPassword(), user.getPassword())) {
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
			User user = Repository.getInstance().getUserDAO().getUserByUsername(id);
			return gson.toJson(user);
		});
	}

	public static void register() {
		post("/register", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			RegisterUserDTO u = gson.fromJson(payload, RegisterUserDTO.class);

			User user = UserService.registerBuyer(u);
			System.out.println(user);
			req.session().attribute("user", user);

			return gson.toJson(user);
		});
	}

	public static void updateProfile() {
		put("/updateProfile", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ProfileDTO profile = gson.fromJson(payload, ProfileDTO.class);

			User user = req.session().attribute("user");
			user = UserService.updateUser(profile, user);

			return gson.toJson(user);
		});
	}
	
	public static void deleteUser() {
		post("/users/:id/delete", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String id = req.params(":id");

			UserService.removeUser(id);
			res.status(200);

			return true;
		});
	}
	
	

}