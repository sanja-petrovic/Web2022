package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Buyer extends User {

	@Expose
	@SerializedName("Membership")
	private Membership membership;
	
	@Expose
	@SerializedName("VisitedObjects")
	private ArrayList<SportsObject> visitedObjects;
	
	@Expose
	@SerializedName("Points")
	private double points;
	
	@Expose
	@SerializedName("BuyerType")
	private BuyerType type;
	
	public Buyer(String username, String password, String name, String surname, Gender gender, LocalDate dateOfBirth, BuyerType buyerType) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.BUYER);
		this.visitedObjects = new ArrayList<>();
		this.type = buyerType;
		this.points = 0;
	}
	
	public Buyer(String username, String password, String name, String surname, Gender gender, LocalDate dateOfBirth,
			Membership membership, ArrayList<SportsObject> visitedObjects, double points, BuyerType type) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.BUYER);
		this.membership = membership;
		this.visitedObjects = visitedObjects;
		this.points = points;
		this.type = type;
	}
	
	public Buyer(User u) {
		super(u);
		this.visitedObjects = new ArrayList<>();
		this.points = 0;
	}

	public Membership getMembership() {
		return membership;
	}
	public void setMembership(Membership membership) {
		this.membership = membership;
	}
	public ArrayList<SportsObject> getVisitedObjects() {
		return visitedObjects;
	}
	public void setVisitedObjects(ArrayList<SportsObject> visitedObjects) {
		this.visitedObjects = visitedObjects;
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
