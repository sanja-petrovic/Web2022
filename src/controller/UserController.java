package controller;

import com.google.gson.Gson;

import beans.User;
import dao.Repository;
import dao.UserDAO;
import dto.LoginUserDTO;
import dto.RegisterUserDTO;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.util.Date;

public class UserController {
	private static Gson gson = new Gson();
	private static UserDAO userDAO = new UserDAO();
	
	public static void login() {

		post("/login", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			LoginUserDTO u = gson.fromJson(payload, LoginUserDTO.class);
			
			User user = userDAO.getUserById(u.getUsername());
			
			if(user == null) {
				res.status(401);
				res.body("Incorrect username and/or password. Please try again.");
				return res.body();
			} else if(!user.getPassword().equals(u.getPassword())) {
				res.status(401);
				res.body("Incorrect username and/or password. Please try again.");
				return res.body();
			}
			
			return gson.toJson(u);
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
