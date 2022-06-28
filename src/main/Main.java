package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import controller.ContentsController;
import controller.BuyerController;
import controller.CommentController;
import controller.ManagerController;
import controller.SportsObjectController;
import controller.TrainerController;
import controller.TrainingController;
import controller.UserController;
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
		
		userController.init();
		sportsObjectController.init();
		managerController.init();
		contentsController.init();
		buyerController.init();
		commentController.init();
		trainerController.init();
		//trainingController.init();
		
	}
	
}
