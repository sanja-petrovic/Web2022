package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Trainer;
import beans.Training;
import beans.User;
import util.adapters.LocalDateTimeAdapter;

public class TrainerDAO {

	private Gson gson;
	private ArrayList<Trainer> trainers;
	
	
	public TrainerDAO() {
		this.trainers = new ArrayList<>();
		this.createGson();
	}
	
	public void init() {
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).serializeNulls().excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/trainers.json"));
		    this.trainers = gson.fromJson(reader, new TypeToken<ArrayList<Trainer>>() {}.getType());
		    for(Trainer t : this.trainers) {
		    	this.fillData(t);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Trainer t) {
		User u = Repository.getInstance().getUserDAO().getUserByUsername(t.getUsername());
		if(t != null) {
			t.setName(u.getName());
			t.setSurname(u.getSurname());
			t.setDateOfBirth(u.getDateOfBirth());
			t.setGender(u.getGender());
			t.setPassword(u.getPassword());
			t.setDeletedAt(u.getDeletedAt());
			t.setUserType(u.getUserType());
			//t.setTrainingHistory(Repository.getInstance().getTrainingDAO().getTrainingsByTrainer(t.getId()));
		}
	}
	
	public void fillTrainingHistory() {
		for(Trainer t : this.trainers) {
			t.setTrainingHistory(Repository.getInstance().getTrainingDAO().getTrainingsByTrainer(t.getId()));
		}
	}
	
	public void write() {
		try {
			FileWriter writer = new FileWriter("resources/data/trainers.json", StandardCharsets.UTF_8);
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
		Trainer retVal = null;
		
		for(Trainer t : this.trainers) {
			if(t.getUsername().equals(username)) {
				retVal = t;
				break;
			}
		}
		
		return retVal;
	}
	
	public Trainer getTrainerById(String id) {
		Trainer retVal = null;
		
		for(Trainer t : this.trainers) {
			if(t.getId().equals(id)) {
				retVal = t;
				break;
			}
		}
		
		return retVal;
	}
	
	public void addTrainer(Trainer t) {
		this.trainers.add(t);
		this.write();
	}
	
	public ArrayList<Trainer> getTrainers() {
		return this.trainers;
	}
}
