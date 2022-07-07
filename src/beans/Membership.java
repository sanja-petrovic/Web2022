package beans;

import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import util.annotations.Exclude;

public class Membership {

	@Expose
	@SerializedName("Id")
	private String id;
	
	@Expose
	@SerializedName("Name")
	private String name;
	
	@Exclude
	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;
	
	@Exclude
	@Expose
	@SerializedName("MembershipType")
	private MembershipType membershipType;
	
	@Exclude
	@Expose
	@SerializedName("Price")
	private double price;
	
	@Exclude
	@Expose
	@SerializedName("NumberOfTerms")
	private int numberOfTerms;
	
	@Exclude
	@Expose
	@SerializedName("DailyLimit")
	private int dailyLimit;
	
	@Exclude
	@Expose
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;
	
	public Membership(String id, String name, SportsObject sportsObject, MembershipType membershipType, double price,
			int numberOfTerms, int dailyLimit) {
		super();
		this.id = id;
		this.name = name;
		this.sportsObject = sportsObject;
		this.membershipType = membershipType;
		this.price = price;
		this.numberOfTerms = numberOfTerms;
		this.dailyLimit = dailyLimit;
	}
	
	public Membership(Membership membership) {
		this.id = membership.getId();
		this.name = membership.getName();
		this.sportsObject = membership.getSportsObject();
		this.membershipType = membership.getMembershipType();
		this.price = membership.getPrice();
		this.numberOfTerms = membership.getNumberOfTerms();
		this.dailyLimit = membership.getDailyLimit();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}

	public MembershipType getMembershipType() {
		return membershipType;
	}

	public void setMembershipType(MembershipType membershipType) {
		this.membershipType = membershipType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getNumberOfTerms() {
		return numberOfTerms;
	}

	public void setNumberOfTerms(int numberOfTerms) {
		this.numberOfTerms = numberOfTerms;
	}

	public int getDailyLimit() {
		return dailyLimit;
	}

	public void setDailyLimit(int dailyLimit) {
		this.dailyLimit = dailyLimit;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}
	
	
}
