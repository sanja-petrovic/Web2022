package services;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDate;

import beans.User;
import beans.UserType;
import dao.Repository;
import dto.ProfileDTO;
import dto.RegisterUserDTO;
import util.parsers.GenderParser;

public class UserService {
	
	public UserService() {
		
	}

	public static User updateUser(ProfileDTO updatedUser, User u) {
		u.setUsername(updatedUser.getUsername());
		u.setGender(GenderParser.parse(updatedUser.getGender()));
		u.setName(updatedUser.getName());
		u.setSurname(updatedUser.getSurname());
		
		return u;
	}
	
	public static User registerUser(RegisterUserDTO registerUserDTO) throws NoSuchAlgorithmException, InvalidKeySpecException {
		User user = new User(registerUserDTO.getUsername(), PasswordService.generateStrongPasswordHash(registerUserDTO.getPassword()), registerUserDTO.getName(), registerUserDTO.getSurname(), GenderParser.parse(registerUserDTO.getGender()), LocalDate.parse(registerUserDTO.getDateOfBirth()), UserType.BUYER);
		Repository.getInstance().getUserDAO().addUser(user);
		
		return user;
	}
	
	public static void removeUser(User u) {
		Repository.getInstance().getUserDAO().removeUser(u);
	}
}
