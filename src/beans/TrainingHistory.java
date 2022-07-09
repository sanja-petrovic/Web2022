package beans;

import java.time.LocalDateTime;
import java.util.UUID;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class TrainingHistory {
	@SerializedName("Id")
	@Expose
	private String id;
	@SerializedName("Trainer")
	@Expose
	private Trainer trainer;
	@SerializedName("Training")
	@Expose
	private Training training;
	@SerializedName("Buyer")
	@Expose
	private Buyer buyer;
	@SerializedName("CheckIn")
	@Expose
	private LocalDateTime checkIn;
	@SerializedName("ScheduledFor")
	@Expose
	private LocalDateTime scheduledFor;
	@SerializedName("CanceledAt")
	@Expose
	private LocalDateTime canceledAt;
	
	public TrainingHistory() {
		super();
	}
	
	public TrainingHistory(Buyer buyer, Training training, LocalDateTime checkIn) {
		this.id = UUID.randomUUID().toString();
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getScheduledFor() {
		return scheduledFor;
	}

	public void setScheduledFor(LocalDateTime scheduledFor) {
		this.scheduledFor = scheduledFor;
	}

	public LocalDateTime getCanceledAt() {
		return canceledAt;
	}

	public void setCanceledAt(LocalDateTime canceledAt) {
		this.canceledAt = canceledAt;
	}

    

}