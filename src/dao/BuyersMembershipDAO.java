package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.BuyerType;
import beans.BuyersMembership;
import beans.Membership;
import beans.MembershipStatus;
import beans.SportsObject;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;
import util.annotations.AnnotationExclusionStrategy;

public class BuyersMembershipDAO {

	private String filePath = "resources/data/buyersmemberships.json";
	private ArrayList<BuyersMembership> buyersMemberships;
	private Gson gson;
	
	public BuyersMembershipDAO() {
		this.buyersMemberships = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).setExclusionStrategies(new AnnotationExclusionStrategy()).create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get(filePath));
		    this.buyersMemberships = gson.fromJson(reader, new TypeToken<ArrayList<BuyersMembership>>() {}.getType());
		    for(BuyersMembership bm : this.buyersMemberships) {
		    	this.fillData(bm);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}

	public void fillData(BuyersMembership bm) {
		Membership membership = Repository.getInstance().getMembershipDAO().getMembershipById(bm.getId());
		if(membership != null) {	
			bm.setPrice(membership.getPrice());
			bm.setNumberOfTerms(membership.getNumberOfTerms());
			bm.setDailyLimit(membership.getDailyLimit());
			SportsObject sportsObject = Repository.getInstance().getSportsObjectDAO().getSportsObjectById(membership.getSportsObject().getName());
			bm.setSportsObject(sportsObject);
			bm.setDeletedAt(membership.getDeletedAt());
		}
	}
	
	public ArrayList<BuyersMembership> getBuyersMemberships() {
		return this.buyersMemberships;
	}	
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter(filePath, StandardCharsets.UTF_8);
			gson.toJson(this.buyersMemberships, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addBuyersMembership(BuyersMembership buyersMembership) {
		this.buyersMemberships.add(buyersMembership);
		this.write();
	}
	
	public BuyersMembership getMembershipById(String id) {
		BuyersMembership retVal = null;
		for(BuyersMembership bm : this.buyersMemberships) {
			if(bm.getId().equals(id)) {
				retVal = bm;
				break;
			}
		
		}
		return retVal;
	}
	
	public BuyersMembership getMembershipByBuyerId(String id) {
		BuyersMembership retVal = null;
		for(BuyersMembership bm : this.buyersMemberships) {
			if(bm.getBuyer().getId().equals(id)) {
				retVal = bm;
				break;
			}
		}
		return retVal;
	}
	
	public BuyersMembership checkIfMembershipExpired(BuyersMembership buyersMembership) {
		if(buyersMembership.getStatus().equals(MembershipStatus.INACTIVE)) 
			return buyersMembership;
		else {
			int val = buyersMembership.getDateTimeOfExpiration().compareTo(LocalDateTime.now());
			if(val < 0) {
				buyersMembership.setStatus(MembershipStatus.INACTIVE);
				updateBuyersMembership(buyersMembership);
				recalculatePoints(buyersMembership);
			}
			return buyersMembership;
		}
	}
	public void recalculatePoints(BuyersMembership buyersMembership) {
		Buyer buyer = Repository.getInstance().getBuyerDAO().getBuyerByUsername(buyersMembership.getBuyer().getUsername());
		double points = buyer.getPoints();
		double lostPoints;
		double addPoints;
		double usedTerms = buyersMembership.getUsedTerms();
		int totalTerms = buyersMembership.getNumberOfTerms();
		double membershipPrice = buyersMembership.getPrice();
		if(usedTerms < (double) totalTerms/3) {
			lostPoints = membershipPrice/1000 * 133 * 4;
			points -= lostPoints;
			buyer.setPoints(points);
		}
		else {
			addPoints = membershipPrice/1000 * usedTerms;
			points += addPoints;
			buyer.setPoints(points);
		}
		BuyerType buyerType = buyer.getType();
	
		if(points >= 1000 && points < 2000) {
			buyerType.setTier("Bronzani");
		}
		else if(points >= 2000 && points < 3000) {
			buyerType.setTier("Srebrni");
		}
		else if(points >= 3000) {
			buyerType.setTier("Zlatni");
		}
		else {
			buyerType.setTier("Bronzani");
		}
		buyer.setType(buyerType);
		Repository.getInstance().getBuyerDAO().updateBuyer(buyer);
	}
	
	public void updateBuyersMembership(BuyersMembership buyersMembership) {
		int index = this.findIndexOf(buyersMembership);
		this.buyersMemberships.set(index, buyersMembership);
		this.write();
	}
	
	public int findIndexOf(BuyersMembership buyersMembership) {
		int index = -1; 
    	for(int i = 0; i < this.buyersMemberships.size(); i++) {
    		if(this.buyersMemberships.get(i).getBuyer().getId().equals(buyersMembership.getBuyer().getId())) {
    			index = i;
    			break;
    		}
    	}
    	return index;
    }
	
	
}
