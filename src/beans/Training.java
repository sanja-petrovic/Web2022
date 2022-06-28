package beans;

import java.time.LocalDateTime;
import java.util.UUID;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Training {
	
	private String id;
	@Expose
	@SerializedName("Title")
	private String title;
	@Expose
	@SerializedName("Type")
	@Expose
	@SerializedName("SportsObject")
	private TrainingType type;
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
	
	public Training(String title, TrainingType type, SportsObject sportsObject, int durationMinutes, Trainer trainer,
			String description, String picture) {
		this.id = UUID.randomUUID().toString();
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

	public TrainingType getType() {
		return type;
	}

	public void setType(TrainingType type) {
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
