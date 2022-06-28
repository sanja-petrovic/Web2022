package controller;

import static spark.Spark.get;
import static spark.Spark.path;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Content;
import dao.Repository;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class ContentsController {

	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getContents();
			getContentsForSportsObject();
	
		});
	}
	
	public static void getContents() {
		get("/contents", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return gson.toJson(Repository.getInstance().getContentsDAO().getContents());
		});
	}
	
	public static void getContentsForSportsObject() {
		get("/getContentsForSportsObject", (req, res) -> {  
			res.type("application/json");
			String name = req.queryParams("name");
			res.status(200);
			List<Content> contents = Repository.getInstance().getContentsDAO().getContentsForSportsObject(name);
			return gson.toJson(contents);
		});
	}
	
}
