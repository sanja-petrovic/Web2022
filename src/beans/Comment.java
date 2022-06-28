package beans;

import java.time.LocalDateTime;

public class Comment {
	private Buyer buyer;
	private SportsObject sportsObject;
	private String content;
	private int grade;
	private LocalDateTime deletedAt;
	
	public Buyer getBuyer() {
		return buyer;
	}
	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}
	public SportsObject getSportsObject() {
		return sportsObject;
	}
	public void setSportsObject(SportsObject sportsObject) {
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
	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}
	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}
}
