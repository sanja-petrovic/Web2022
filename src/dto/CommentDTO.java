package dto;

public class CommentDTO {
	private String buyer;
	private String sportsObject;
	private String content;
	private int grade;
	
	public String getBuyer() {
		return buyer;
	}
	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}
	public String getSportsObject() {
		return sportsObject;
	}
	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	
	
}
