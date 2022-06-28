package beans;

import java.time.LocalDate;
import java.util.ArrayList;

import util.annotations.Exclude;

public class Trainer extends User {

	@Exclude
	private ArrayList<Training> trainingHistory;
	
	public Trainer(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.TRAINER);
		this.trainingHistory = new ArrayList<>();
	}

	public Trainer(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth, ArrayList<Training> trainingHistory) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.TRAINER);
		this.trainingHistory = trainingHistory;
	}
	
	public Trainer(User u) {
		super(u);
		this.trainingHistory = new ArrayList<>();
	}
	
	public ArrayList<Training> getTrainingHistory() {
		return trainingHistory;
	}

	public void setTrainingHistory(ArrayList<Training> trainingHistory) {
		this.trainingHistory = trainingHistory;
	}

	
}
