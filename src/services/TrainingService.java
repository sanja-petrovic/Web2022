package services;

import java.util.UUID;

import beans.Content;
import beans.SportsObject;
import beans.Training;
import beans.TrainingType;
import dao.Repository;
import dto.CreateTrainingDTO;

public class TrainingService {
	
	public TrainingService() {
		
	}
	
	public static Training createTraining(CreateTrainingDTO createTrainingDTO) {
		
		SportsObject sportsObject = Repository.getInstance().getSportsObjectDAO().getSportsObjectByName(createTrainingDTO.getSportsObjectName());
		Content content = new Content();
		content.setId(UUID.randomUUID().toString());
		content.setName(createTrainingDTO.getName());
		content.setType(createTrainingDTO.getContentType());
		content.setDurationMinutes(Integer.parseInt(createTrainingDTO.getDurationMinutes()));
		content.setDescription(createTrainingDTO.getDescription());
		content.setSportsObject(sportsObject);
		if(!createTrainingDTO.getImgData().isEmpty()) {
			String picturePath = "./static/resources/"+createTrainingDTO.getFileName();
			content.setPicture("resources/" + createTrainingDTO.getFileName());
			createTrainingDTO.setFileName(picturePath);

			picturePath = "resources/" + createTrainingDTO.getFileName();
		}
		Training training = new Training(content);
		training.setTrainer(createTrainingDTO.getTrainer());
		if (createTrainingDTO.getTrainingType().equals("personalni"))
			training.setTrainingType(TrainingType.PERSONAL);
		else
			training.setTrainingType(TrainingType.GROUP);
		training.setPrice(Double.parseDouble(createTrainingDTO.getPrice()));
		Repository.getInstance().getContentsDAO().addContent(content);
		Repository.getInstance().getTrainingDAO().addTraining(training);
		return training;
	}
	

}
