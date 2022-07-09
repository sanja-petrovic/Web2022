package controller;

import static spark.Spark.path;
import static spark.Spark.post;
import static spark.Spark.get;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.BuyersMembership;
import beans.Membership;
import beans.User;
import dao.Repository;
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
			getBuyerMembership();
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
	
	public static void getBuyerMembership() {
		get("/buyersmemberships/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			BuyersMembership buyersMembership = Repository.getInstance().getBuyersMembershipDAO().getMembershipByBuyerId(id);
			BuyersMembership validMembership = Repository.getInstance().getBuyersMembershipDAO().checkIfMembershipExpired(buyersMembership);
			return gson.toJson(validMembership);
		});
	}
}
