package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.PromoCode;
import beans.TrainingHistory;
import dao.Repository;
import dto.CreatePromoCodeDTO;
import dto.TrainingHistoryDTO;
import services.PromoCodeService;
import services.TrainingHistoryService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter2;
import util.adapters.LocalTimeAdapter;

public class TrainingHistoryController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter2()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getTrainingHistoryForUser();
			getTrainingHistoryForSportsObject();
			getTrainingHistoryForTrainer();
			cancelTraining();
			addTrainingToHistory();
		});
	}
	
	public static void getTrainingHistoryForUser() {
		get("/users/:id/trainings", (req, res) -> {
			return gson.toJson(Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryForBuyer(req.params(":id")));
		});
	}
	
	public static void getTrainingHistoryForSportsObject() {
		get("/sportsobjects/:id/trainings", (req, res) -> {
			return gson.toJson(Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryForSportsObject(req.params(":id")));
		});
	}
	
	public static void getTrainingHistoryForTrainer() {
		get("/trainers/:id/trainings", (req, res) -> {
			return gson.toJson(Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryForTrainer(req.params(":id")));
		});
	}
	
	public static void cancelTraining() {
		post("/trainings/:id/cancel", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String id = req.params(":id");
			
			return gson.toJson(TrainingHistoryService.cancelTraining(id));
		});
	}
	
	public static void addTrainingToHistory() {
		post("/addToHistory", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			TrainingHistoryDTO trainingHistoryDTO = gson.fromJson(payload, TrainingHistoryDTO.class); 
			TrainingHistory trainingHistory = TrainingHistoryService.addTrainingToHistory(trainingHistoryDTO);
			return gson.toJson(trainingHistory);
		});
	}
}