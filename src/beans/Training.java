package beans;

import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Training {
	@Expose
	@SerializedName("Title")
	private String title;
	@Expose
	@SerializedName("Type")
	private String type;
	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;
	@Expose
	@SerializedName("Duration")
	private int durationMinutes;
	@Expose
	@SerializedName("Trainer")
	private Trainer trainer;
	@Expose
	@SerializedName("Description")
	private String description;
	@Expose
	@SerializedName("Picture")
	private String picture;
	@Expose
	@SerializedName("Price")
	private double price;
	@Expose
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;
	
	public Training(String title, String type, SportsObject sportsObject, int durationMinutes, Trainer trainer,
			String description, String picture) {
		this.title = title;
		this.type = type;
		this.sportsObject = sportsObject;
		this.durationMinutes = durationMinutes;
		this.trainer = trainer;
		this.description = description;
		this.picture = picture;
	}

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

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}

	public int getDurationMinutes() {
		return durationMinutes;
	}

	public void setDurationMinutes(int durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
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

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}
}
