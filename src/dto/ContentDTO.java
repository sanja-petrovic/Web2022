package dto;

public class ContentDTO {
	
	private String name;
	private String sportsObjectName;
	private String contentType;
	private String imgData;
	private String fileName;
	private String description;
	private String durationMinutes;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSportsObjectName() {
		return sportsObjectName;
	}
	public void setSportsObjectName(String sportsObjectName) {
		this.sportsObjectName = sportsObjectName;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public String getImgData() {
		return imgData;
	}
	public void setImgData(String imgData) {
		this.imgData = imgData;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDurationMinutes() {
		return durationMinutes;
	}
	public void setDurationMinutes(String durationMinutes) {
		this.durationMinutes = durationMinutes;
	}

}
