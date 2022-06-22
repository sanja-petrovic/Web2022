package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.SportsObject;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class SportsObjectDAO {

	private String filePath = "resources/data/sportsobjects.json";
	private ArrayList<SportsObject> sportsObjects;


	public SportsObjectDAO() {
		this.sportsObjects = new ArrayList<>();
		this.load();
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
	
	public SportsObject getSportsObjectById(String name) {
		SportsObject retVal = null;
		for(SportsObject sportsObject : this.sportsObjects) {
			if(sportsObject.getName().equals(name)) {
				retVal = sportsObject;
				break;
			}
		}
		
		return retVal;
	}
	
	public List<SportsObject> getSportsObjectByType(String type) {
		List<SportsObject> searchedObjects = new ArrayList<SportsObject>();
		for (SportsObject sportsObject : this.sportsObjects) {
			if(sportsObject.getType().equals(type)) {
				searchedObjects.add(sportsObject);
			}
		}
		return searchedObjects;
	}
	
	public List<SportsObject> getSportsObjectByName(String name) {
		List<SportsObject> searchedObjects = new ArrayList<SportsObject>();
		for (SportsObject sportsObject : this.sportsObjects) {
			if(sportsObject.getName().toLowerCase().contains(name)) {
				searchedObjects.add(sportsObject);
			}
		}
		return searchedObjects;
	}
	
	public List<SportsObject> getSportsObjectByLocation(String location) {
		List<SportsObject> searchedObjects = new ArrayList<SportsObject>();
		for (SportsObject sportsObject : this.sportsObjects) {
			if(sportsObject.getLocation().getAddress().getCity().toLowerCase().contains(location)) {
				searchedObjects.add(sportsObject);
			}
			else if(sportsObject.getLocation().getAddress().getCountry().toLowerCase().contains(location)) {
				searchedObjects.add(sportsObject);
			}
		}
		return searchedObjects;
	}


	public List<SportsObject> getSportsObjectByRatingInterval(Double minRating, Double maxRating) {
		List<SportsObject> searchedObjects = new ArrayList<SportsObject>();
		for (SportsObject sportsObject : this.sportsObjects) {
			if(sportsObject.getAverageGrade() >= minRating && sportsObject.getAverageGrade() <= maxRating) {
				searchedObjects.add(sportsObject);
			}
		}
		return searchedObjects;
	}
	
	
	
}
