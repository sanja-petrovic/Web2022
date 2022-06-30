package beans;

import java.time.LocalDateTime;
import java.util.UUID;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Comment {
	@Expose
	@SerializedName("Id")
	private String id;

	@Expose
	@SerializedName("Buyer")
	private Buyer buyer;

	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;

	@Expose
	@SerializedName("Content")
	private String content;

	@Expose
	@SerializedName("Grade")
	private int grade;

	@Expose
	@SerializedName("Status")
	private CommentStatus status;

	@Expose
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;
	
	public Comment(Buyer buyer, SportsObject sportsObject, String content, int grade) {
		this.id = UUID.randomUUID().toString();
		this.buyer = buyer;
		this.sportsObject = sportsObject;
		this.content = content;
		this.grade = grade;
		this.status = CommentStatus.PENDING;
	}
	
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

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
