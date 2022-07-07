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

public class MembershipController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getMemberships();
		});
	}
	
	public static void getMemberships() {
		get("/memberships", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return gson.toJson(Repository.getInstance().getMembershipDAO().getMemberships());
		});
	}

}
