package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User {

	@Expose
	@SerializedName("Username")
	private String username;
	@SerializedName("Password")
	private String password;
	@SerializedName("Name")
	private String name;
	@SerializedName("Surname")
	private String surname;
	@SerializedName("Gender")
	private Gender gender;
	@SerializedName("DateOfBirth")
	private LocalDate dateOfBirth;
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;
	@SerializedName("UserType")
	private UserType userType;

	public User(String username, String password, String name, String surname, Gender gender, LocalDate dateOfBirth,
			UserType userType) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.userType = userType;
	}
	
	public User(User u) {
		this.username = u.getUsername();
		this.password = u.getPassword();
		this.name = u.getName();
		this.surname = u.getSurname();
		this.gender = u.getGender();
		this.dateOfBirth = u.getDateOfBirth();
		this.userType = u.getUserType();
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
	
	public Gender getGender() {
		return gender;
	}
	
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}
	
	@Override
	public String toString() {
		return this.userType + ": " + this.name + " " + this.surname;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

}
