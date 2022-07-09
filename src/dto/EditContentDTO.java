package dto;

public class EditContentDTO {

	private String name;
	private String type;
	private int duration;
	private String description;
	private String picture;
	private String id;
	
	public EditContentDTO(String name, String type, int duration, String description, String picture, String id) {
		super();
		this.name = name;
		this.type = type;
		this.duration = duration;
		this.description = description;
		this.picture = picture;
		this.id = id;
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
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
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
	
	
}
