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
import beans.User;
import beans.UserType;
import util.adapters.LocalDateTimeAdapter;

public class BuyerDAO {
	private ArrayList<Buyer> buyers;
	private Gson gson;
	
	public BuyerDAO() {
		this.buyers = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/buyers.json"));
		    this.buyers = gson.fromJson(reader, new TypeToken<ArrayList<Buyer>>() {}.getType());
		    for(Buyer b : this.buyers) {
		    	this.fillData(b);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Buyer b) {
		User u = Repository.getInstance().getUserDAO().getUserByUsername(b.getUsername());
		if(u != null) {
			b.setName(u.getName());
			b.setSurname(u.getSurname());
			b.setDateOfBirth(u.getDateOfBirth());
			b.setGender(u.getGender());
			b.setPassword(u.getPassword());
			b.setDeletedAt(u.getDeletedAt());
			b.setUserType(UserType.BUYER);
			if(b.getType() != null) {
				b.setType(Repository.getInstance().getBuyerTypeDAO().getBuyerTypeByTier(b.getType().getTier()));
			}
			if(b.getMembership() != null) {
				Membership membership = Repository.getInstance().getMembershipDAO().getMembershipById(b.getMembership().getId());
				b.setMembership(membership);
			}
		}
	}
	
	
	public void writeBuyers() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/buyers.json", StandardCharsets.UTF_8);
			gson.toJson(this.buyers, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addBuyer(Buyer b) {
		this.buyers.add(b);
		this.writeBuyers();
	}
	
	public Buyer getBuyerById(String id) {
		Buyer retVal = null;
		for(Buyer b : this.buyers) {
			if(b.getDeletedAt() == null && b.getId().equals(id)) {
				retVal = b;
				break;
			}
		}
		
		return retVal;
	}
	
	public void updateBuyer(Buyer buyer) {
		int index = this.findIndexOf(buyer);
		if(index != -1) {
			this.buyers.set(index, buyer);
			this.writeBuyers();
		}
	}
	
	public int findIndexOf(Buyer buyer) {
    	int index = -1; 

    	for(int i = 0; i < this.buyers.size(); i++) {
    		if(this.buyers.get(i).getDeletedAt() == null && this.buyers.get(i).getId().equals(buyer.getId())) {
    			index = i;
    			break;
    		}
    	}

    	return index;
    }
	
	public Buyer getBuyerByUsername(String username) {
		Buyer retVal = null;
		for(Buyer b : this.buyers) {
			if(b.getDeletedAt() == null && b.getUsername().equals(username)) {
				retVal = b;
				break;
			}
		}
		
		return retVal;
	}
	
	public ArrayList<Buyer> getBuyers() {
		return new ArrayList<Buyer>(this.buyers.stream()
				  .filter(u -> u.getDeletedAt() == null)
				  .collect(Collectors.toList()));
	}

}
