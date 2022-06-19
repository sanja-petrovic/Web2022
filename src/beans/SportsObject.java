package beans;

import java.util.ArrayList;

import com.google.gson.annotations.SerializedName;

public class SportsObject {

	@SerializedName("name")
	private String name;
	@SerializedName("type")
	private String type;
	@SerializedName("offers")
	private ArrayList<String> offers;
	@SerializedName("status")
	private SportsObjectStatus status; 
	@SerializedName("location")
	private Location location;
	@SerializedName("logoIcon")
	private String logoIcon;
	@SerializedName("averageGrade")
	private double averageGrade;
	@SerializedName("businessHours")
	private BusinessHours businessHours;


	public SportsObject(String name, String type, ArrayList<String> offers, SportsObjectStatus status,
			Location location, String logoIcon, double averageGrade, BusinessHours businessHours) {
		super();
		this.name = name;
		this.type = type;
		this.offers = offers;
		this.status = status;
		this.location = location;
		this.logoIcon = logoIcon;
		this.averageGrade = averageGrade;
		this.businessHours = businessHours;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ArrayList<String> getOffers() {
		return offers;
	}

	public void setOffers(ArrayList<String> offers) {
		this.offers = offers;
	}

	public SportsObjectStatus getStatus() {
		return status;
	}

	public void setStatus(SportsObjectStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoIcon() {
		return logoIcon;
	}

	public void setLogoIcon(String logoIcon) {
		this.logoIcon = logoIcon;
	}

	public double getAverageGrade() {
		return averageGrade;
	}

	public void setAverageGrade(double averageGrade) {
		this.averageGrade = averageGrade;
	}

	public BusinessHours getBusinessHours() {
		return businessHours;
	}

	public void setBusinessHours(BusinessHours businessHours) {
		this.businessHours = businessHours;
	}
}
