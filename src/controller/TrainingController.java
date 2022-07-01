package controller;

import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Training;
import dto.CreateTrainingDTO;
import services.TrainingService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class TrainingController {
		
	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).serializeNulls().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			createTraining();
		});
	}
	
	
	public static void createTraining() {
		post("/createTraining", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			CreateTrainingDTO createTraining = gson.fromJson(payload, CreateTrainingDTO.class);		
			Training training = TrainingService.createTraining(createTraining);
			return gson.toJson(training);
		});
	}

}
