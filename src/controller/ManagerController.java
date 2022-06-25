package controller;

import static spark.Spark.get;
import static spark.Spark.path;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.Repository;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class ManagerController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getManagers();
			getUnassignedManagers();
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
}
