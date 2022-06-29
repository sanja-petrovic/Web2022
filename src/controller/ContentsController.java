package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Base64;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Content;
import beans.SportsObject;
import dao.Repository;
import dto.ContentDTO;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class ContentsController {

	private static Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getContents();
			getContentsForSportsObject();
			createContent();
	
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
	
	public void createContent() {
		post("/createContent", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			ContentDTO contentDTO = gson.fromJson(payload, ContentDTO.class);

			SportsObject sportsObject = Repository.getInstance().getSportsObjectDAO().getSportsObjectByName(contentDTO.getSportsObjectName());
			Content content = new Content();
			content.setName(contentDTO.getName());
			content.setType(contentDTO.getContentType());
			content.setDurationMinutes(Integer.parseInt(contentDTO.getDurationMinutes()));
			content.setDescription(contentDTO.getDescription());
			content.setSportsObject(sportsObject);
			
			if(!contentDTO.getImgData().isEmpty()) {
				byte[] data;
				try {
					data = Base64.getDecoder().decode(contentDTO.getImgData().split(",")[1]);						
				} catch(Exception e) {
					res.status(400);
					return "Data is not valid!";
				}
				String picturePath = "./static/resources/"+contentDTO.getFileName();
				content.setPicture("resources/" + contentDTO.getFileName());
				contentDTO.setFileName(picturePath);
				try (OutputStream stream = new FileOutputStream(new File(picturePath).getCanonicalFile())) {
				    stream.write(data);
				}

				picturePath = "resources/" + contentDTO.getFileName();
			}
			
			Repository.getInstance().getContentsDAO().addContent(content);
			return gson.toJson(content);
		
		
		});
	}
	
}
