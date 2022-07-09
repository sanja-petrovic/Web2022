package dto;

import beans.Trainer;

public class TrainingHistoryDTO {
	
	private Trainer trainer;
	private String contentId;
	private String buyerUsername;
	
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
	
	
}
