package controller;

import static spark.Spark.get;
import static spark.Spark.path;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.SportsObject;
import dao.SportsObjectDAO;
import util.LocalDateTimeAdapter;
import util.LocalTimeAdapter;

public class SportsObjectController {
	
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static SportsObjectDAO sportsObjectDAO = new SportsObjectDAO();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getSportsObjects();
			getSportsObjectByType();
			getSportsObjectByName();
			getSportsObjectByLocation();
			getSportsObjectByRatingInterval();
		});
	}
	
	public static void getSportsObjects() {
		get("/sportsobjects", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return gson.toJson(sportsObjectDAO.getSportsObjects());
		});
	}
	
	public static void getSportsObjectByType() {
		get("/getSportsObjectByType", (req, res) -> {  
			res.type("application/json");
			String type = req.queryParams("type");
			res.status(200);
			List<SportsObject> searchedObjects = sportsObjectDAO.getSportsObjectByType(type);
			return gson.toJson(searchedObjects);
		});
	}
	
	public static void getSportsObjectByName() {
		get("/getSportsObjectByName", (req, res) -> {  
			res.type("application/json");
			String name = req.queryParams("name");
			res.status(200);
			List<SportsObject> searchedObjects = sportsObjectDAO.getSportsObjectByName(name);
			return gson.toJson(searchedObjects);
		});
	}
	
	public static void getSportsObjectByLocation() {
		get("/getSportsObjectByLocation", (req, res) -> {  
			res.type("application/json");
			String location = req.queryParams("location");
			res.status(200);
			List<SportsObject> searchedObjects = sportsObjectDAO.getSportsObjectByLocation(location);
			return gson.toJson(searchedObjects);
		});
	}
	
	public static void getSportsObjectByRatingInterval() {
		get("/getSportsObjectByRatingInterval", (req, res) -> {  
			res.type("application/json");
			Double minRating = Double.parseDouble(req.queryParams("minRating"));
			Double maxRating = Double.parseDouble(req.queryParams("maxRating"));
			res.status(200);
			List<SportsObject> searchedObjects = sportsObjectDAO.getSportsObjectByRatingInterval(minRating, maxRating);
			return gson.toJson(searchedObjects);
		});
	}
	
}
