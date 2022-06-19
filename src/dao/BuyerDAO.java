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

import beans.Buyer;
import beans.BuyerType;
import beans.User;
import beans.UserType;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

public class BuyerDAO {
	private ArrayList<Buyer> buyers;
	private UserDAO userDAO;
	private BuyerTypeDAO buyerTypeDAO;
	private MembershipDAO membershipDAO;
	private Gson gson;
	private static Repository repository;
	
	public BuyerDAO() {
		this.buyers = new ArrayList<>();
		this.buyerTypeDAO = new BuyerTypeDAO();
		this.membershipDAO = new MembershipDAO();
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
		User u = repository.getInstance().getUserDAO().getUserById(b.getUsername());
		if(u != null) {
			b.setName(u.getName());
			b.setSurname(u.getSurname());
			b.setDateOfBirth(u.getDateOfBirth());
			b.setGender(u.getGender());
			b.setPassword(u.getPassword());
			b.setDeletedAt(u.getDeletedAt());
			if(b.getType() != null) {
				b.setType(this.buyerTypeDAO.getBuyerTypeByTier(b.getType().getTier()));
			}
			if(b.getMembership() != null) {
				b.setMembership(this.membershipDAO.getMembershipById(b.getMembership().getId()));
			}
		}
	}
	
	
	public void writeBuyers() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/buyers.json");
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

}
