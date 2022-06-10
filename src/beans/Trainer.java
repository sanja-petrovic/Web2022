package beans;

import java.time.LocalDate;
import java.util.ArrayList;

public class Trainer extends User {

	private ArrayList<Training> trainingHistory;
	
	public Trainer(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth) {
		super(username, password, name, surname, gender, dateOfBirth);
		this.trainingHistory = new ArrayList<>();
	}

	public Trainer(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth, ArrayList<Training> trainingHistory) {
		super(username, password, name, surname, gender, dateOfBirth);
		this.trainingHistory = trainingHistory;
	}
	
	public ArrayList<Training> getTrainingHistory() {
		return trainingHistory;
	}

	public void setTrainingHistory(ArrayList<Training> trainingHistory) {
		this.trainingHistory = trainingHistory;
	}

	
}
