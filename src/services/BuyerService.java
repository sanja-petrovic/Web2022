package services;

import java.util.ArrayList;

import beans.Buyer;
import beans.TrainingHistory;
import dao.Repository;

public class BuyerService {

	public static boolean checkIfFirstVisit(String b, String s) {
		boolean retVal = false;
		int count = 0;
		Buyer buyer = Repository.getInstance().getBuyerDAO().getBuyerByUsername(b);
		ArrayList<TrainingHistory> trainingHistory = Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryForBuyer(b);
		for(TrainingHistory th : trainingHistory) {
			if(th.getTraining().getSportsObject().getName().equals(s)) {
				count++;
				if(count > 1) {
					retVal = false;
					break;
				}
			}
		}
		
		if(count == 1) {
			retVal = true;
		}

		return retVal;
	}
}
