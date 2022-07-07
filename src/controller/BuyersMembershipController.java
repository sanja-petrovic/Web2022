package controller;

import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Membership;
import dto.BuyersMembershipDTO;
import services.BuyersMembershipService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class BuyersMembershipController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			createMembership();
		});
	}
	
	public static void createMembership() {
		post("/createBuyersMembership", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			BuyersMembershipDTO createMembershipDTO = gson.fromJson(payload, BuyersMembershipDTO.class);		
			Membership membership = BuyersMembershipService.createMembership(createMembershipDTO);
			return gson.toJson(membership);
		});
	}
}
