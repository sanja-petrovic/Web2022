package beans;

public class Training extends Content {
	private String type;
	private Trainer trainer;

	public Training(String type, Trainer trainer) {
		super();
		this.type = type;
		this.trainer = trainer;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

}
