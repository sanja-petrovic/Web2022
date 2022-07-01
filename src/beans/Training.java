package beans;
import com.google.gson.annotations.SerializedName;

public class Training extends Content {
	
	@SerializedName("TrainingType")
	private TrainingType trainingType;
	@SerializedName("Trainer")
	private Trainer trainer;
	@SerializedName("Price")
	private double price;
	
	public Training(String name, String type, SportsObject sportsObject, int durationMinutes, String description,
			String picture, TrainingType trainingType, Trainer trainer, Double price) {
		super(name, type, sportsObject, durationMinutes, description, picture);
		this.trainingType = trainingType;
		this.trainer = trainer;
		this.price = price;
	}
	
	public Training(Content content) {
		super(content);
		
	}
	
	public TrainingType getTrainingType() {
		return trainingType;
	}
	public void setTrainingType(TrainingType trainingType) {
		this.trainingType = trainingType;
	}
	public Trainer getTrainer() {
		return trainer;
	}
	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
