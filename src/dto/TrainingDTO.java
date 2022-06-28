package dto;

import beans.SportsObject;
import beans.Trainer;

public class TrainingDTO {
	private String title;
	private String type;
	private String sportsObject;
	private int durationMinutes;
	private String trainer;
	private String description;
	private String picture;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSportsObject() {
		return sportsObject;
	}
	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}
	public int getDurationMinutes() {
		return durationMinutes;
	}
	public void setDurationMinutes(int durationMinutes) {
		this.durationMinutes = durationMinutes;
	}
	public String getTrainer() {
		return trainer;
	}
	public void setTrainer(String trainer) {
		this.trainer = trainer;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
}
