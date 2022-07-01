package beans;

import java.time.LocalDateTime;
import java.util.UUID;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import util.annotations.Exclude;

public class Content {
	
	@Expose
	@SerializedName("Id")
	private String id;
	
	@Exclude
	@Expose
	@SerializedName("Name")
	private String name;
	
	@Exclude
	@Expose
	@SerializedName("ContentType")
	private String contentType;
	
	@Exclude
	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;
	
	@Exclude
	@Expose
	@SerializedName("Duration")
	private int durationMinutes;
	
	@Exclude
	@Expose
	@SerializedName("Description")
	private String description;
	
	@Exclude
	@Expose
	@SerializedName("Picture")
	private String picture;
	
	@Exclude
	@Expose
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;

	public Content() {
		super();
		this.sportsObject = null;
	}

	public Content(String name, String type, SportsObject sportsObject, int durationMinutes, String description,
			String picture) {
		this.id = UUID.randomUUID().toString();
		this.name = name;
		this.contentType = type;
		this.sportsObject = sportsObject;
		this.durationMinutes = durationMinutes;
		this.description = description;
		this.picture = picture;
	}
	
	public Content(Content content) {
		this.id = content.getId();
		this.name = content.getName();
		this.contentType = content.getContentType();
		this.sportsObject = content.getSportsObject();
		this.durationMinutes = content.getDurationMinutes();
		this.description = content.getDescription();
		this.picture = content.getPicture();		
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return this.contentType;
	}

	public void setType(String type) {
		this.contentType = type;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}

}
