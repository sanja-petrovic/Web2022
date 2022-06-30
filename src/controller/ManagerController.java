package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import dao.Repository;
import dto.RegisterUserDTO;
import services.UserService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class ManagerController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getManagers();
			getUnassignedManagers();
			createManager();
		});
	}
	
	public static void getManagers() {
		get("/managers", (req, res) -> {
			return gson.toJson(Repository.getInstance().getManagerDAO().getManagers());
		});
	}
	
	public static void getUnassignedManagers() {
		get("/unassigned-managers", (req, res) -> {
			return gson.toJson(Repository.getInstance().getManagerDAO().getUnassignedManagers());
		});
	}
	
	public static void createManager() {
		post("/create-manager", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			RegisterUserDTO u = gson.fromJson(payload, RegisterUserDTO.class);
			
			User user = UserService.registerManager(u);
			
			return gson.toJson(user);
		});
	}
}
