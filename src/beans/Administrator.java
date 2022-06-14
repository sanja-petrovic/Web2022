package beans;

import java.time.LocalDate;

public class Administrator extends User {

	public Administrator(String username, String password, String name, String surname, Gender gender,
			LocalDate dateOfBirth) {
		super(username, password, name, surname, gender, dateOfBirth, UserType.ADMIN);
	}

}
