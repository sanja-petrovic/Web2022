package controller;

import static spark.Spark.get;
import static spark.Spark.path;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Training;
import beans.User;
import dao.Repository;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class BuyerController {

	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getBuyers();
			getBuyer();
		//	getVisitsByBuyer();
		});
	}
	
	public static void getBuyers() {
		get("/buyers", (req, res) -> {
			return gson.toJson(Repository.getInstance().getBuyerDAO().getBuyers());
		});
	}
	
	public static void getBuyer() {
		get("/users/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			User user = Repository.getInstance().getUserDAO().getUserByUsername(id);
			return gson.toJson(user);
		});
	}
	/*
	public static void getVisitsByBuyer() {
		get("/visits/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			HashMap<Training, LocalDate> visits = Repository.getInstance().getBuyerDAO().getBuyerByUsername(id).getVisits();
			return gson.toJson(visits);
		});
	}*/
}
