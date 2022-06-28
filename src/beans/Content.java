package beans;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Content {
	@Expose()
	@SerializedName("name")
	private String name;
	@Expose
	@SerializedName("type")
	private String type;
	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;
	@Expose
	@SerializedName("durationMinutes")
	private int durationMinutes;
	@Expose
	@SerializedName("description")
	private String description;
	@Expose
	@SerializedName("picture")
	private String picture;

	public Content() {
		super();
		this.sportsObject = null;
	}

	public Content(String name, String type, SportsObject sportsObject, int durationMinutes, String description,
			String picture) {
		super();
		this.name = name;
		this.type = type;
		this.sportsObject = sportsObject;
		this.durationMinutes = durationMinutes;
		this.description = description;
		this.picture = picture;
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

}
