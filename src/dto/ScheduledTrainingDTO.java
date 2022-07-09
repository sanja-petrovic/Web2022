package dto;

import java.time.LocalDateTime;

import beans.Trainer;

public class ScheduledTrainingDTO {
	
	private Trainer trainer;
	private String contentId;
	private String buyerUsername;
	private String scheduledFor;
	
	public Trainer getTrainer() {
		return trainer;
	}
	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}
	public String getContentId() {
		return contentId;
	}
	public void setContentId(String contentId) {
		this.contentId = contentId;
	}
	public String getBuyerUsername() {
		return buyerUsername;
	}
	public void setBuyerUsername(String buyerUsername) {
		this.buyerUsername = buyerUsername;
	}
	public String getScheduledFor() {
		return scheduledFor;
	}
	public void setScheduledFor(String scheduledFor) {
		this.scheduledFor = scheduledFor;
	}
	
	
}
