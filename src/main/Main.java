package main;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import dao.Repository;


public class Main {
	
	public static void main(String[] args) throws IOException {
		Repository.getInstance().loadData();
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
	}
	
}
