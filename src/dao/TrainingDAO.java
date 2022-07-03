package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Content;
import beans.SportsObject;
import beans.Trainer;
import beans.Training;
import beans.User;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;
import util.annotations.AnnotationExclusionStrategy;

public class TrainingDAO {

	private ArrayList<Training> trainings;
	private Gson gson;
	
	public TrainingDAO() {
		this.trainings = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).setExclusionStrategies(new AnnotationExclusionStrategy()).create();
	}
	
	public void load() {
		try {
			this.createGson();
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
		Content content = Repository.getInstance().getContentsDAO().getContentById(t.getId());
		SportsObject sportsObject = Repository.getInstance().getSportsObjectDAO().getSportsObjectById(content.getSportsObject().getName());
		Trainer trainer = Repository.getInstance().getTrainerDAO().getTrainerByUsername(t.getTrainer().getUsername());
		t.setTrainer(trainer);
		t.setSportsObject(sportsObject);
	}
	
	public ArrayList<Training> getTrainings() {
		return this.trainings;
	}
	
	public void addTraining(Training training) {
		this.trainings.add(training);
		this.write();
	}
	
	
	public void write() {
		try {
			FileWriter writer = new FileWriter("resources/data/trainings.json", StandardCharsets.UTF_8);
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


	public Training getTrainingById(String id) {
		Training retVal = null;
		
		for(Training t : this.trainings) {
			if(t.getId().equals(id)) {
				retVal = t;
				break;
			}
		
		}
		return retVal;
	}
	
	public Trainer getTrainerByTrainingId(String id) {
		Trainer retVal = null;
		
		for(Training t : this.trainings) {
			if(t.getId().equals(id)) {
				User u = Repository.getInstance().getTrainerDAO().getTrainerByUsername(t.getTrainer().getUsername());
				retVal = (Trainer) u;
				break;
			}
		
		}
		return retVal;
	}
	
	public Double getPriceByTrainingId(String id) {
		Double retVal = 0.0;
		
		for(Training t : this.trainings) {
			if(t.getId().equals(id)) {
				retVal = t.getPrice();
				break;
			}
		
		}
		return retVal;
	}
}
	