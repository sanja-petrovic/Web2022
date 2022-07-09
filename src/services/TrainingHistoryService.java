package services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

import beans.Buyer;
import beans.BuyersMembership;
import beans.SportsObject;
import beans.Training;
import beans.TrainingHistory;
import dao.Repository;
import dto.TrainingHistoryDTO;

public class TrainingHistoryService {
	
	public static TrainingHistory cancelTraining(String id) {
		TrainingHistory trainingHistory = Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryById(id);
		trainingHistory.setCanceledAt(LocalDateTime.now());
		Repository.getInstance().getTrainingHistoryDAO().updateTrainingHistory(trainingHistory);
		
		return trainingHistory;
	}
	
	public static TrainingHistory addTrainingToHistory(TrainingHistoryDTO trainingHistoryDTO) {		
		Buyer buyer = Repository.getInstance().getBuyerDAO().getBuyerByUsername(trainingHistoryDTO.getBuyerUsername());
		Training training = Repository.getInstance().getTrainingDAO().getTrainingById(trainingHistoryDTO.getContentId());
		SportsObject sportsObject = training.getSportsObject();
		ArrayList<SportsObject> list = buyer.getVisitedObjects();
		if(buyer.getVisitedObjects().contains(sportsObject))
			list.add(sportsObject);
	
		buyer.setVisitedObjects(list);
		Repository.getInstance().getBuyerDAO().updateBuyer(buyer);
		TrainingHistory trainingHistory = new TrainingHistory();
		trainingHistory.setId(UUID.randomUUID().toString());
		trainingHistory.setTraining(training);
		trainingHistory.setTrainer(trainingHistoryDTO.getTrainer());
		trainingHistory.setBuyer(buyer);
		trainingHistory.setCheckIn(LocalDateTime.now());
		
		BuyersMembership buyersMembership = Repository.getInstance().getBuyersMembershipDAO().getMembershipByBuyerId(buyer.getId());
		buyersMembership.setUsedTerms(buyersMembership.getUsedTerms() + 1);
		
		Repository.getInstance().getBuyersMembershipDAO().updateBuyersMembership(buyersMembership);
		Repository.getInstance().getTrainingHistoryDAO().addTrainingHistory(trainingHistory);
		
		return trainingHistory;
	}
	
	public static void removeByBuyer(String id) {
		Repository.getInstance().getTrainingHistoryDAO().removeByBuyer(id);
	}
}
