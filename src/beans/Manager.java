package beans;

import java.time.LocalDate;

public class Manager extends User {

	private SportsObject sportsObject;
	
	public Manager(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth) {
		super(username, password, name, surname, gender, dateOfBirth);
	}
	
	public Manager(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth, SportsObject sportsObject) {
		super(username, password, name, surname, gender, dateOfBirth);
		this.sportsObject = sportsObject;
	}

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}
	
}
