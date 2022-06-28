package dao;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Trainer;
import beans.Training;
import util.adapters.LocalDateTimeAdapter;

public class TrainingDAO {

	private ArrayList<Training> trainings;
	

	private Gson gson;
	private ArrayList<Trainer> trainers;
	
	
	public TrainingDAO() {
		this.trainings = new ArrayList<>();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
	}
	
	public Training getTrainerById(String id) {
		Training retVal = null;
		
		for(Training t : this.trainings) {
			if(t.getId().equals(id)) {
				retVal = t;
				break;
			}
		}
		
		return retVal;
	}
	
}
