package dto;
import java.time.LocalDate;

import beans.Gender;
import beans.User; 
public class RegisterUserDTO {

	private String name;
	private String surname;
	private String gender;
	private String dob;
	private String username;
	private String password;
	
	public RegisterUserDTO(String name, String surname, String gender, String dateOfBirth, String username,
			String password) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dob = dateOfBirth;
	}
	
	public Gender parseGender() {
		Gender parsed;
		if(this.gender.trim().toLowerCase().startsWith("m")) {
			parsed = Gender.MALE;
		} else {
			parsed = Gender.FEMALE;
		}
		
		return parsed;
	}
	
	public LocalDate parseDate() {
		return LocalDate.parse(this.dob);
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDateOfBirth() {
		return dob;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dob = dateOfBirth;
	}
	
	
}
