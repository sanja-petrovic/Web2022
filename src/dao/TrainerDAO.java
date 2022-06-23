package dao;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Trainer;
import beans.User;
import beans.UserType;
import util.adapters.LocalDateTimeAdapter;

public class TrainerDAO {

	private Gson gson;
	private ArrayList<Trainer> trainers;
	
	
	public TrainerDAO() {
		this.trainers = new ArrayList<>();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		for(User u : Repository.getInstance().getUserDAO().getUsers()) {
			 if(u.getUserType().equals(UserType.TRAINER)) {
				 this.trainers.add((Trainer) u);
			 }
		}
	}
}
