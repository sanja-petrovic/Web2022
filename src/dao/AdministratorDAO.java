package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Administrator;
import beans.Trainer;
import beans.User;
import beans.UserType;
import util.adapters.LocalDateTimeAdapter;

public class AdministratorDAO {

	private ArrayList<Administrator> admins;
	private Gson gson;
	
	public AdministratorDAO() {
		this.admins = new ArrayList<>();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/users.json"));
		    ArrayList<User> users = gson.fromJson(reader, new TypeToken<ArrayList<User>>() {}.getType());
		    
		    for(User u : users) {
		    	if(u.getUserType().equals(UserType.ADMIN)) {
		    		this.admins.add(new Administrator(u));
		    	}
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void write() {
		try {
			Repository.getInstance().getUserDAO().write();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addAdmin(Administrator a) {
		Repository.getInstance().getUserDAO().addUser(a);
		this.admins.add(a);
	}
	
}
