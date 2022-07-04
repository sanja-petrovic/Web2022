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
import beans.User;
import dao.Repository;
import dto.RegisterUserDTO;
import services.UserService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class TrainerController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).serializeNulls().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getTrainers();
			createTrainer();
			getTrainer();
		});
	}
	
	public static void getTrainers() {
		get("/trainers", (req, res) -> {
			return gson.toJson(Repository.getInstance().getTrainerDAO().getTrainers());
		});
	}
	
	public static void getTrainer() {
		get("/trainers/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			Trainer trainer = Repository.getInstance().getTrainerDAO().getTrainerByUsername(id);
			return gson.toJson(trainer);
		});
	}
	
	public static void createTrainer() {
		post("/create-trainer", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			RegisterUserDTO u = gson.fromJson(payload, RegisterUserDTO.class);
			
			User user = UserService.registerTrainer(u);
			
			return gson.toJson(user);
		});
	}

}
