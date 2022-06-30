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
		this.createGson();
		this.load();
		
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.admins.clear();
		    ArrayList<User> users = Repository.getInstance().getUserDAO().getUsers();
		    for(User u : users) {
		    	if(u.getUserType().equals(UserType.ADMIN)) {
		    		this.admins.add(new Administrator(u));
		    	}
		    }

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
	
	public ArrayList<Administrator> getAdmins() {
		return this.admins;
	}
	
	public Administrator getAdminByUsername(String username) {
		Administrator retVal = null;
		for(Administrator a : this.admins) {
			if(a.getUsername().equals(username)) {
				retVal = a;
				break;
			}
		}
		
		return retVal;
	}
	
}
