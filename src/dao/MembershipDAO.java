package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

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
		    	this.fillData(m);
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
			if(m.getId().equals(id)) {
				retVal = m;
				break;
			}
		}
		
		return retVal;
	}
	
	public ArrayList<Membership> getMemberships() {
		
		return this.memberships;
	}
}
