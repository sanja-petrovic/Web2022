package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.BuyerType;
import beans.Membership;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

public class MembershipDAO {
	private ArrayList<Membership> memberships;
	private Gson gson;
	
	public MembershipDAO() {
		this.memberships = new ArrayList<>();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/memberships.json"));
		    this.memberships = gson.fromJson(reader, new TypeToken<ArrayList<Membership>>() {}.getType());
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public Membership getMembershipById(String id) {
		this.load();
		Membership retVal = null;
		for(Membership m : this.memberships) {
			if(m.getId().equals(id)) {
				retVal = m;
				break;
			}
		}
		
		return retVal;
	}
}
