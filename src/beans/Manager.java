package beans;

import java.time.LocalDate;
import java.util.ArrayList;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Manager extends User {

	@Expose
	@SerializedName("SportsObject")
	private SportsObject sportsObject;
	
	public Manager(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.MANAGER);
	}
	
	public Manager(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth, SportsObject sportsObject) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.MANAGER);
		this.sportsObject = sportsObject;
	}
	
	public Manager(User u) {
		super(u);
		this.sportsObject = null;
	}

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}
	
}
