package beans;

import java.time.LocalDateTime;

public class TrainingHistory {
	private Trainer trainer;
	private Training training;
	private Buyer buyer;
	private LocalDateTime checkIn;
	
	public TrainingHistory(Buyer buyer, Training training, LocalDateTime checkIn) {
		this.buyer = buyer;
        this.trainer = training.getTrainer();
        this.training = training;
        this.checkIn = checkIn;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public Training getTraining() {
		return training;
	}

	public void setTraining(Training training) {
		this.training = training;
	}

	public Buyer getBuyer() {
		return buyer;
	}

	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}

	public LocalDateTime getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(LocalDateTime checkIn) {
		this.checkIn = checkIn;
	}

    

}