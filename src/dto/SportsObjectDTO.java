package dto;

import java.util.ArrayList;

import beans.BusinessHours;
import beans.Location;
import beans.SportsObjectStatus;

public class SportsObjectDTO {

	private String name;
	private String type;
	private String location;
	private String logoIcon;
	
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLogoIcon() {
		return logoIcon;
	}
	public void setLogoIcon(String logoIcon) {
		this.logoIcon = logoIcon;
	}
	
	
	
}
