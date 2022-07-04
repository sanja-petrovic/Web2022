package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import beans.TrainingHistory;
import controller.AdminController;
import controller.BuyerController;
import controller.CommentController;
import controller.ContentsController;
import controller.ManagerController;
import controller.SportsObjectController;
import controller.TrainerController;
import controller.TrainingController;
import controller.TrainingHistoryController;
import controller.UserController;
import dao.Repository;
import dao.TrainingHistoryDAO;


public class Main {
	
	public static void main(String[] args) throws IOException {
		Repository.getInstance().loadData();
		port(3031);
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
		/*
		TrainingHistoryDAO dao = new TrainingHistoryDAO();
		dao.addTrainingHistory(new TrainingHistory(
				Repository.getInstance().getBuyerDAO().getBuyers().get(0),
				Repository.getInstance().getTrainingDAO().getTrainings().get(1),
				LocalDateTime.of(2022, 5, 25, 0, 0, 0)
				));
		

		dao.addTrainingHistory(new TrainingHistory(
				Repository.getInstance().getBuyerDAO().getBuyers().get(0),
				Repository.getInstance().getTrainingDAO().getTrainings().get(2),
				LocalDateTime.of(2022, 7, 12, 0, 0, 0)
				));*/
	}
	
}
