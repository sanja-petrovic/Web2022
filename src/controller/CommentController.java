package controller;

import static spark.Spark.get;
import static spark.Spark.path;
import static spark.Spark.post;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Comment;
import beans.CommentStatus;
import beans.SportsObject;
import beans.Training;
import beans.User;
import dao.Repository;
import dto.CommentDTO;
import dto.RegisterUserDTO;
import services.BuyerService;
import services.CommentService;
import services.UserService;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class CommentController {

	private static Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	private static String basePath = "/rest";
	
	public void init() {
		path(basePath, () -> {
			getComments();
			getCommentsBySportsObject();
			postComment();
			getCommentCheck();
			approveComment();
			denyComment();
		});
	}
	
	public static void getComments() {
		get("/comments", (req, res) -> {
			return gson.toJson(Repository.getInstance().getCommentDAO().getComments());
		});
	}
	
	public static void getCommentsBySportsObject() {
		get("/comments/:id", (req, res) -> {
			res.type("application/json");
			String id = req.params(":id");
			ArrayList<Comment> comments = Repository.getInstance().getCommentDAO().getCommentsBySportsObject(id);
			return gson.toJson(comments);
		});
	}
	
	public static void postComment() {
		post("/post-comment", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			CommentDTO c = gson.fromJson(payload, CommentDTO.class);
			
			Comment comment = CommentService.postComment(c);
			
			return gson.toJson(comment);
		});
	}
	
	public static void getCommentCheck() {
		get("/buyer-comments/:b/:s", (req, res) -> {
			res.type("application/json");
			String buyer = req.params(":b");
			String sportsObject = req.params(":s");
			
		/*	if(BuyerService.checkIfFirstVisit(buyer, sportsObject)) {
				res.status(200);
				res.body("Can make comment");
			} else {
				res.status(403);
				res.body("Can't make comment");
			}
		*/	
			return res.body();
		});
	}
	
	public static void approveComment() {
		post("/comments/:id/approve", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String id = req.params(":id");
			
			Comment comment = CommentService.changeCommentStatus(id, CommentStatus.APPROVED);
			
			return gson.toJson(comment);
		});
	}
	
	public static void denyComment() {
		post("/comments/:id/deny", (req, res) -> {
			res.type("application/json");
			String payload = req.body();
			String id = req.params(":id");
			
			Comment comment = CommentService.changeCommentStatus(id, CommentStatus.DENIED);
			
			return gson.toJson(comment);
		});
	}
	
}
