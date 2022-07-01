package services;

import beans.Manager;
import beans.SportsObject;
import beans.Trainer;
import beans.Training;
import beans.TrainingType;
import beans.User;
import beans.UserType;
import dao.Repository;

public class AuthorizationService {
	
	public static boolean isAdmin(User u) {
		return u.getUserType().equals(UserType.ADMIN);
	}
	
	public static boolean isManager(User u) {
		return u.getUserType().equals(UserType.MANAGER);
	}
	
	public static boolean isTrainer(User u) {
		return u.getUserType().equals(UserType.TRAINER);
	}
	
	public static boolean isBuyer(User u) {
		return u.getUserType().equals(UserType.BUYER);
	}
	
	public static boolean isManagerOfSportsObject(Manager m, SportsObject so) {
		return m.getSportsObject().getName().equalsIgnoreCase(so.getName());
	}
	
	public static boolean canCancelTraining(Trainer trainer, Training training) {
		return training.getTrainer() != null && training.getTrainer().getId().equals(trainer.getId()) && training.getType().equals(TrainingType.PERSONAL);
	}
	
	
	public static boolean canSeeUnapprovedCommentsForSportsObject(User u, SportsObject so) {
		boolean retVal;
		if(u.getUserType().equals(UserType.ADMIN)) {
			retVal = true;
		} else if(u.getUserType().equals(UserType.MANAGER)) {
			Manager m = Repository.getInstance().getManagerDAO().getManagerById(u.getId());
			retVal = m.getSportsObject().getName().equalsIgnoreCase(so.getName());
		} else {
			retVal = false;
		}
		
		return retVal;
	}

}
