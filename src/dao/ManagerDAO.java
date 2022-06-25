package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Manager;
import beans.User;
import util.adapters.LocalDateTimeAdapter;

public class ManagerDAO {
	private Gson gson;
	private ArrayList<Manager> managers;
	
	
	public ManagerDAO() {
		this.managers = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/managers.json"));
		    this.managers = gson.fromJson(reader, new TypeToken<ArrayList<Manager>>() {}.getType());
		    for(Manager m : this.managers) {
		    	this.fillData(m);
		    }
		    reader.close();
		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Manager m) {
		User u = Repository.getInstance().getUserDAO().getUserByUsername(m.getUsername());
		if(u != null) {
			m.setName(u.getName());
			m.setSurname(u.getSurname());
			m.setDateOfBirth(u.getDateOfBirth());
			m.setGender(u.getGender());
			m.setPassword(u.getPassword());
			m.setDeletedAt(u.getDeletedAt());
			if(m.getSportsObject() != null) {
				m.setSportsObject(Repository.getInstance().getSportsObjectDAO().getSportsObjectById(m.getSportsObject().getName()));
			}
		}
	}
	
	
	public void writeBuyers() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/buyers.json");
			gson.toJson(this.managers, writer);
			writer.flush();
			writer.close();
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addManager(Manager m) {
		this.managers.add(m);
		this.writeBuyers();
	}
	
	public Manager getManagerById(String username) {
		Manager retVal = null;
		for(Manager m : this.managers) {
			if(m.getUsername().equals(username)) {
				retVal = m;
				break;
			}
		}
		
		return retVal;
	}
	
	public ArrayList<Manager> getManagers() {

		return this.managers;
		
	}
	
	public ArrayList<Manager> getUnassignedManagers() {
		ArrayList<Manager> managers = new ArrayList<>();
		for(Manager manager : this.managers) {
			if(manager.getSportsObject() == null) {
				managers.add(manager);
			}
		}
		
		return managers;
	}
}
