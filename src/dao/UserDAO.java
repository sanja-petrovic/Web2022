package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Gender;
import beans.User;

public class UserDAO {
	
	private ArrayList<User> users;
	
	public UserDAO() {
		this.users = new ArrayList<>();
	}
	
	public void load() {
		try {
		    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/users.json"));
		    this.users = gson.fromJson(reader, new TypeToken<ArrayList<User>>() {}.getType());
		    for(User u : this.users) {
		    	System.out.println(u);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void writeUsers() {
		Gson gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
		try {
			FileWriter writer = new FileWriter("resources/data/users.json");
			gson.toJson(this.users, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public ArrayList<User> getUsers() {
		return this.users;
	}

	public void setUsers(ArrayList<User> users) {
		this.users = users;
	}

	public User getUserById(String id) {
		for (User user : users) {
			if (user.getUsername().equals(id)) {
				return user;
			}
		}
		return null;
	}

	/*public User getUserFromData(String[] data) {
	}

	public ArrayList<User> searchUsers(String name, String surname, String startDateOfBirth, String endDateOfBirth,
			String sort) {
	}*/

}
