package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.Membership;
import beans.SportsObject;
import util.adapters.LocalDateTimeAdapter;

public class MembershipDAO {
	
	private ArrayList<Membership> memberships;
	private Gson gson;
	
	public MembershipDAO() {
		this.memberships = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
		 this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/memberships.json"));
		    this.memberships = gson.fromJson(reader, new TypeToken<ArrayList<Membership>>() {}.getType());
		    for(Membership m : this.memberships) {
		    	if(m.getDeletedAt() == null) {
		    		this.fillData(m);
		    	}
		    }
		    reader.close();
		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Membership m) {
		if(m.getSportsObject() != null)
		{
			SportsObject s = Repository.getInstance().getSportsObjectDAO().getSportsObjectByName(m.getSportsObject().getName());
			m.setSportsObject(s);	
		}
	}
	
	public Membership getMembershipById(String id) {
		Membership retVal = null;
		for(Membership m : this.memberships) {
			if(m.getDeletedAt() == null && m.getId().equals(id)) {
				retVal = m;
				break;
			}
		}
		
		return retVal;
	}
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/memberships.json", StandardCharsets.UTF_8);
			gson.toJson(this.memberships, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<Membership> getMemberships() {
		return new ArrayList<Membership>(this.memberships.stream()
				  .filter(u -> u.getDeletedAt() == null)
				  .collect(Collectors.toList()));
	}
	
	public void removeMembership(String id) {
		for(Membership m : this.getMemberships()) {
			if(m.getId().equals(id)) {
				m.setDeletedAt(LocalDateTime.now());
				this.write();
				break;
			}
		}
	}
}
