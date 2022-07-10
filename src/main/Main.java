package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import controller.AdminController;
import controller.BuyerController;
import controller.BuyersMembershipController;
import controller.CommentController;
import controller.ContentsController;
import controller.ManagerController;
import controller.MembershipController;
import controller.PromoCodeController;
import controller.SportsObjectController;
import controller.TrainerController;
import controller.TrainingController;
import controller.TrainingHistoryController;
import controller.UserController;
import dao.BuyerDAO;
import dao.Repository;


public class Main {
	
	public static void main(String[] args) throws IOException {
		Repository.getInstance().loadData();
		port(3030);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		UserController userController = new UserController();
		SportsObjectController sportsObjectController = new SportsObjectController();
		ContentsController contentsController = new ContentsController();
		ManagerController managerController = new ManagerController();
		BuyerController buyerController = new BuyerController();
		TrainingController trainingController = new TrainingController();
		TrainerController trainerController = new TrainerController();
		CommentController commentController = new CommentController();
		AdminController adminController = new AdminController();
		TrainingHistoryController trainingHistoryController = new TrainingHistoryController();
		MembershipController membershipController = new MembershipController();
		BuyersMembershipController buyersMembershipController = new BuyersMembershipController();
		PromoCodeController promoCodeController = new PromoCodeController();
		
		BuyerDAO buyerDAO = new BuyerDAO();
		buyerDAO.getBuyersByVisitedSportsObject("No Limit Gym");
		
		userController.init();
		sportsObjectController.init();
		managerController.init();
		contentsController.init();
		buyerController.init();
		commentController.init();
		trainerController.init();
		adminController.init();
		trainingController.init();
		trainingHistoryController.init();
		membershipController.init();
		buyersMembershipController.init();
		promoCodeController.init();
	}
	
}
