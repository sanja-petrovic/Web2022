package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.SportsObject;
import util.LocalDateTimeAdapter;
import util.LocalTimeAdapter;

public class SportsObjectDAO {

	private String filePath = "resources/data/sportsobjects.json";
	private ArrayList<SportsObject> sportsObjects;


	public SportsObjectDAO() {
		this.sportsObjects = new ArrayList<>();
	}


	public void load() {
		try {
		    Gson gson = new GsonBuilder().registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
		    Reader reader = Files.newBufferedReader(Paths.get(filePath));
		    this.sportsObjects = gson.fromJson(reader, new TypeToken<ArrayList<SportsObject>>() {}.getType());
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public ArrayList<SportsObject> getSportsObjects() {
		this.load();
		return this.sportsObjects;
	}
}
