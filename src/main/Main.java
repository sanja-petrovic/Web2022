package main;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import controller.SportsObjectController;
import controller.UserController;
import dao.Repository;


public class Main {
	
	public static void main(String[] args) throws IOException {
		Repository.getInstance().loadData();
		port(3030);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		UserController userController = new UserController();
		SportsObjectController sportsObjectController = new SportsObjectController();
		userController.init();
		sportsObjectController.init();
	}
	
}
