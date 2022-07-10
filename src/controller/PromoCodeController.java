package controller;

import static spark.Spark.path;
import static spark.Spark.post;
import static spark.Spark.get;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.PromoCode;
import beans.SportsObject;
import dao.Repository;
import dto.CreatePromoCodeDTO;
import services.ContentService;
import services.PromoCodeService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class PromoCodeController {
	
	private static Gson gson = new GsonBuilder().setPrettyPrinting()
			.registerTypeAdapter(LocalTime.class, new LocalTimeAdapter())
			.registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
			.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public PromoCodeController() {
		
	}
	
	public void init() {
		path(basePath, () -> {
			createPromoCode();
			getPromoCodes();
			getPromoCodeById();
			removePromoCode();
		});
	}
	
	public static void getPromoCodes() {
		get("/promocodes", (req, res) -> {
			res.type("application/json");
			res.status(200);
			return gson.toJson(Repository.getInstance().getPromoCodeDAO().getPromoCodes());
		});
	}
	
	public static void getPromoCodeById() {
		get("/promocodes/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			PromoCode promoCode = Repository.getInstance().getPromoCodeDAO().getPromoCodeById(id);
			return gson.toJson(promoCode);
		});
	}
	
	public static void createPromoCode() {
		post("/createPromocode", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			CreatePromoCodeDTO promoCodeDTO = gson.fromJson(payload, CreatePromoCodeDTO.class);
			PromoCode promocode = PromoCodeService.createPromoCode(promoCodeDTO);
			return gson.toJson(promocode);
		});
	}
	
	public static void removePromoCode() {
		post("/promocodes/:id/delete", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String id = req.params(":id");
			PromoCodeService.removePromoCode(id);
			res.status(200);

			return true;
		});
	}
}
