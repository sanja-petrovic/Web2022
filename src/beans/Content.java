package beans;


public class Content {
	private String name;
	private String type;
	private String sportsObjectName;
	private int durationMinutes;
	private String description;
	private String picture;

	public Content() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Content(String name, String type, String sportsObjectName, int durationMinutes, String description,
			String picture) {
		super();
		this.name = name;
		this.type = type;
		this.sportsObjectName = sportsObjectName;
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

	public String getSportsObjectName() {
		return sportsObjectName;
	}

	public void setSportsObjectName(String sportsObjectName) {
		this.sportsObjectName = sportsObjectName;
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
