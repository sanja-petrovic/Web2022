package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.SportsObject;
import beans.Trainer;
import beans.Training;
import util.adapters.LocalDateTimeAdapter;

public class TrainingDAO {

	private ArrayList<Training> trainings;
	private Gson gson;
	
	public TrainingDAO() {
		this.trainings = new ArrayList<>();
		this.createGson();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/trainings.json"));
		    this.trainings = gson.fromJson(reader, new TypeToken<ArrayList<Training>>() {}.getType());
		    for(Training t : this.trainings) {
		    	this.fillData(t);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public void fillData(Training t) {
		SportsObject sportsObject = Repository.getInstance().getSportsObjectDAO().getSportsObjectById(t.getSportsObject().getName());
		Trainer trainer = Repository.getInstance().getTrainerDAO().getTrainerByUsername(t.getTrainer().getUsername());
		t.setTrainer(trainer);
		t.setSportsObject(sportsObject);
	}
	
	public void write() {
		try {
			FileWriter writer = new FileWriter("resources/data/trainings.json");
			gson.toJson(this.trainings, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<Training> getTrainingsByTrainer(String id) {
		ArrayList<Training> trainings = new ArrayList<>();
		for(Training t : this.trainings) {
			if(t.getTrainer().getId().equals(id)) {
				trainings.add(t);
			}
		}
		
		return trainings;
	}
}
