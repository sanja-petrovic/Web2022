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

import beans.Buyer;
import beans.Trainer;
import beans.Training;
import beans.User;
import beans.UserType;
import util.adapters.LocalDateTimeAdapter;

public class TrainerDAO {

	private Gson gson;
	private ArrayList<Trainer> trainers;
	
	
	public TrainerDAO() {
		this.trainers = new ArrayList<>();
		this.createGson();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/trainers.json"));
		    this.trainers = gson.fromJson(reader, new TypeToken<ArrayList<Trainer>>() {}.getType());
		    
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Trainer t) {
		t.setTrainingHistory(Repository.getInstance().getTrainingDAO().getTrainingsByTrainer(t.getId()));
	}
	
	public void write() {
		try {
			FileWriter writer = new FileWriter("resources/data/trainers.json");
			gson.toJson(this.trainers, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public Trainer getTrainerByUsername(String username) {
		this.load();
		Trainer retVal = null;
		for(Trainer t : this.trainers) {
			if(t.getUsername().equals(username)) {
				retVal = t;
				break;
			}
		}
		
		return retVal;
	}
	
	public Trainer getTrainerByUsername(String username) {
		Trainer retVal = null;
		
		for(Trainer t : this.trainers) {
			if(t.getUsername().equals(username)) {
				retVal = t;
				break;
			}
		}
		
		return retVal;
	}
}
