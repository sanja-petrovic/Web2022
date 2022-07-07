package services;

import java.time.LocalDateTime;

import beans.TrainingHistory;
import dao.Repository;

public class TrainingHistoryService {
	
	public static TrainingHistory cancelTraining(String id) {
		TrainingHistory trainingHistory = Repository.getInstance().getTrainingHistoryDAO().getTrainingHistoryById(id);
		trainingHistory.setCanceledAt(LocalDateTime.now());
		Repository.getInstance().getTrainingHistoryDAO().updateTrainingHistory(trainingHistory);
		
		return trainingHistory;
	}
}
