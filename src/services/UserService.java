package services;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import beans.Administrator;
import beans.Buyer;
import beans.Manager;
import beans.Trainer;
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
        u.setGender(GenderParser.parse(updatedUser.getGender()));
        u.setName(updatedUser.getName());
        u.setSurname(updatedUser.getSurname());
        u.setDateOfBirth(LocalDate.parse(updatedUser.getDob()));
        Repository.getInstance().getUserDAO().updateUser(u);
        return u;
    }
	
	public static Buyer registerBuyer(RegisterUserDTO registerUserDTO) throws NoSuchAlgorithmException, InvalidKeySpecException {
		User user = new User(registerUserDTO.getUsername(), PasswordService.generateStrongPasswordHash(registerUserDTO.getPassword()), registerUserDTO.getName(), registerUserDTO.getSurname(), GenderParser.parse(registerUserDTO.getGender()), LocalDate.parse(registerUserDTO.getDateOfBirth()), UserType.BUYER);
		Buyer b = new Buyer(user);
		b.setType(Repository.getInstance().getBuyerTypeDAO().getBuyerTypeByTier("Bronzani"));
		Repository.getInstance().getUserDAO().addUser(user);
		Repository.getInstance().getBuyerDAO().addBuyer(b);
		
		return b;
	}
	
	public static Manager registerManager(RegisterUserDTO registerUserDTO) throws NoSuchAlgorithmException, InvalidKeySpecException {
		User user = new User(registerUserDTO.getUsername(), PasswordService.generateStrongPasswordHash(registerUserDTO.getPassword()), registerUserDTO.getName(), registerUserDTO.getSurname(), GenderParser.parse(registerUserDTO.getGender()), LocalDate.parse(registerUserDTO.getDateOfBirth()), UserType.MANAGER);
		Manager m = new Manager(user);
		Repository.getInstance().getUserDAO().addUser(user);
		Repository.getInstance().getManagerDAO().addManager(m);
		
		return m;
	}
	
	public static Trainer registerTrainer(RegisterUserDTO registerUserDTO) throws NoSuchAlgorithmException, InvalidKeySpecException {
		User user = new User(registerUserDTO.getUsername(), PasswordService.generateStrongPasswordHash(registerUserDTO.getPassword()), registerUserDTO.getName(), registerUserDTO.getSurname(), GenderParser.parse(registerUserDTO.getGender()), LocalDate.parse(registerUserDTO.getDateOfBirth()), UserType.TRAINER);
		Trainer t = new Trainer(user);
		Repository.getInstance().getUserDAO().addUser(user);
		Repository.getInstance().getTrainerDAO().addTrainer(t);
		
		return t;
	}
	
	public static void removeUser(String id) {
		Repository.getInstance().getUserDAO().removeUser(id);
	}
	
	public static User getCompleteData(String username) {
		User retVal = null;
		
		UserType userType = Repository.getInstance().getUserDAO().getUserTypeByUsername(username);
		
		switch(userType) {
		case BUYER:
			User u = Repository.getInstance().getBuyerDAO().getBuyerByUsername(username);
			BuyersMembershipService.removeByBuyer(u.getId());
			CommentService.removeByBuyer(u.getId());
			TrainingHistoryService.removeByBuyer(u.getId());
			retVal = (Buyer) u;
			break;
		case MANAGER:
			u = Repository.getInstance().getManagerDAO().getManagerByUsername(username);
			retVal = (Manager) u;
			break;
		case TRAINER:
			u = Repository.getInstance().getTrainerDAO().getTrainerByUsername(username);
			retVal = (Trainer) u;
			break;
		case ADMIN:
			u = Repository.getInstance().getAdministratorDAO().getAdminByUsername(username);
			retVal = (Administrator) u;
			break;
		default:
			break;
		
		
		}
		
		
		return retVal;
	}
}
