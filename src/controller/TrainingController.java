package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Trainer;
import beans.Training;
import beans.TrainingType;
import dao.Repository;
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
			getTrainings();
			getTrainerByTrainingId();
			getPriceByTrainingId();
			getTypeByTrainingId();
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
	
	public static void getTrainings() {
		get("/trainings", (req, res) -> {
			res.type("application/json");
			return gson.toJson(Repository.getInstance().getTrainingDAO().getTrainings());
		});
	}
	
	public static void getTrainerByTrainingId() {
		get("/trainings/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			Trainer trainer = Repository.getInstance().getTrainingDAO().getTrainerByTrainingId(id);
			return gson.toJson(trainer);
		});
	}
	
	public static void getPriceByTrainingId() {
		get("/trainings/price/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			Double price = Repository.getInstance().getTrainingDAO().getPriceByTrainingId(id);
			return gson.toJson(price);
		});
	}
	public static void getTypeByTrainingId() {
		get("/trainings/type/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			TrainingType type = Repository.getInstance().getTrainingDAO().getTypeByTrainingId(id);
			return gson.toJson(type);
		});
	}
	
	

	

}
