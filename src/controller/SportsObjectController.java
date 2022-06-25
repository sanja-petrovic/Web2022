package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.BusinessHours;
import beans.Location;
import beans.Manager;
import beans.SportsObject;
import beans.SportsObjectStatus;
import beans.User;
import beans.UserType;
import dao.Repository;
import dao.SportsObjectDAO;
import dto.RegisterUserDTO;
import dto.SportsObjectDTO;
import services.PasswordService;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class SportsObjectController {
	
	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static SportsObjectDAO sportsObjectDAO = new SportsObjectDAO();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			createSportsObject();
			getSportsObjects();
			getSportsObjectByType();
			getSportsObjectByName();
			getSportsObjectByLocation();
			getSportsObjectByRatingInterval();
		});
	}
	
	
	public void createSportsObject() {
		post("/createSportsObject", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			SportsObjectDTO s = gson.fromJson(payload, SportsObjectDTO.class);
			
			Manager m = Repository.getInstance().getManagerDAO().getManagerById(s.getManager());

			
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
			SportsObject sportsObject = new SportsObject();
			sportsObject.setName(s.getName());
			sportsObject.setType(s.getType());
			sportsObject.setStatus(SportsObjectStatus.WORKING);
			sportsObject.setBusinessHours(new BusinessHours(LocalTime.parse(s.getBusinessHoursStart(), dtf), LocalTime.parse(s.getBusinessHoursEnd(), dtf)));
			m.setSportsObject(sportsObject);
			
			if(!s.getImgData().isEmpty()) {
				byte[] data;
				try {
					data = Base64.getDecoder().decode(s.getImgData().split(",")[1]);						
				} catch(Exception e) {
					res.status(400);
					return "Data is not valid!";
				}
				String picturePath = "./static/resources/"+s.getFileName();
				sportsObject.setLogoIcon("resources/" + s.getFileName());
				s.setFileName(picturePath);
				try (OutputStream stream = new FileOutputStream(new File(picturePath).getCanonicalFile())) {
				    stream.write(data);
				}

				picturePath = "resources/" + s.getFileName();
			}
			
			Repository.getInstance().getSportsObjectDAO().addSportsObject(sportsObject);
			Repository.getInstance().getManagerDAO().updateManager(m);
			
			return gson.toJson(sportsObject);
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
