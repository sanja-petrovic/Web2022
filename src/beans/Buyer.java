package beans;

import java.time.LocalDate;
import java.util.HashMap;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import util.annotations.Exclude;
import util.annotations.ExcludeUser;



public class Buyer extends User {

	@Expose
	@Exclude
	@ExcludeUser
	@SerializedName("Membership")
	private Membership membership;
	
	@Expose
	@Exclude
	@ExcludeUser
	@SerializedName("Visits")
	private HashMap<Training, LocalDate> visits;
	
	@Expose
	@Exclude
	@ExcludeUser
	@SerializedName("Points")
	private double points;
	
	@Expose
	@Exclude
	@ExcludeUser
	@SerializedName("BuyerType")
	private BuyerType type;
	
	public Buyer(String username, String password, String name, String surname, Gender gender, LocalDate dateOfBirth, BuyerType buyerType) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.BUYER);
		this.visits = new HashMap<>();
		this.type = buyerType;
		this.points = 0;
	}
	
	public Buyer(String username, String password, String name, String surname, Gender gender, LocalDate dateOfBirth,
			Membership membership, HashMap<Training, LocalDate> visits, double points, BuyerType type) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.BUYER);
		this.membership = membership;
		this.visits = visits;
		this.points = points;
		this.type = type;
	}
	
	public Buyer(User u) {
		super(u);
		this.visits = new HashMap<>();
		this.points = 0;
		
	}

	public Membership getMembership() {
		return membership;
	}
	public void setMembership(Membership membership) {
		this.membership = membership;
	}
	public HashMap<Training, LocalDate> getVisits() {
		return visits;
	}
	public void setVisits(HashMap<Training, LocalDate> visits) {
		this.visits = visits;
	}
	public double getPoints() {
		return points;
	}
	public void setPoints(double points) {
		this.points = points;
	}
	public BuyerType getType() {
		return type;
	}
	public void setType(BuyerType type) {
		this.type = type;
	}
	
}
