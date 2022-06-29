package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.User;
import beans.UserType;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;

public class UserDAO {
	
	private ArrayList<User> users;
	
	public UserDAO() {
		this.users = new ArrayList<>();
		this.load();
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
	
	public void write() {
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

	public User getUserByUsername(String username) {
		for (User user : this.users) {
			if (user.getUsername().equals(username)) {
				return user;
			}
		}
		return null;
	}
	
	public void addUser(User u) {
		this.users.add(u);
		this.write();
	}
	
	public UserType getUserTypeByUsername(String username) {
		for(User u : this.users) {
			if(u.getUsername().equals(username)) {
				return u.getUserType();
			}
		}
		return null;
	}
	
	public void removeUser(User u) {
		if(this.users.contains(u)) {
			u.setDeletedAt(LocalDateTime.now());
		}
	}
	
    public void updateUser(User u) {
        int index = this.findIndexOf(u);
        if(index != -1) {
            this.users.set(index, u);
            this.write();
        }
    }

    public int findIndexOf(User u) {
        int index = -1;
        for(int i = 0; i < this.users.size(); i++) {
            if(this.users.get(i).getId().equals(u.getId())) {
                index = i;
                break;
            }
        }

        return index;
    } 


}
