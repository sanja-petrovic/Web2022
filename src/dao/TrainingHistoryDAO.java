package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.Manager;
import beans.Trainer;
import beans.Training;
import beans.TrainingHistory;
import beans.User;
import util.adapters.LocalDateTimeAdapter;

public class TrainingHistoryDAO {
	private Gson gson;
	private ArrayList<TrainingHistory> trainingHistories;
	
	
	public TrainingHistoryDAO() {
		this.trainingHistories = new ArrayList<>();
		this.load();
	}
	
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/traininghistories.json"));
		    this.trainingHistories = gson.fromJson(reader, new TypeToken<ArrayList<TrainingHistory>>() {}.getType());
		    reader.close();
		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData() {
		for(TrainingHistory th : this.trainingHistories) {
			if(th.getDeletedAt() == null) {
				th.setBuyer(Repository.getInstance().getBuyerDAO().getBuyerByUsername(th.getBuyer().getUsername()));
		        /*if(th.getTrainer() != null) {
		            th.setTrainer(Repository.getInstance().getTrainerDAO().getTrainerByUsername(th.getTrainer().getUsername()));
		        }*/
		        th.setTraining(Repository.getInstance().getTrainingDAO().getTrainingById(th.getTraining().getId()));
			}
	    }
		
	}
	
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/traininghistories.json");
			gson.toJson(this.trainingHistories, writer);
			writer.flush();
			writer.close();
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public void addTrainingHistory(TrainingHistory th) {
		this.trainingHistories.add(th);
		this.write();
	}

    public ArrayList<TrainingHistory> getTrainingHistoryForBuyer(String username) {
        ArrayList<TrainingHistory> trainingHistories = new ArrayList<>();
        for(TrainingHistory th : this.trainingHistories) {
            if(th.getDeletedAt() == null && th.getBuyer().getUsername().equals(username)) {
                trainingHistories.add(th);
            }
        }

        return trainingHistories;
    }
    
    public ArrayList<TrainingHistory> getTrainingHistoryForTrainer(String id) {
        ArrayList<TrainingHistory> trainingHistories = new ArrayList<>();
        for(TrainingHistory th : this.trainingHistories) {
            if(th.getDeletedAt() == null && th.getTrainer().getId().equals(id)) {
                trainingHistories.add(th);
            }
        }
        
        return trainingHistories;
    }
    
    public ArrayList<TrainingHistory> getTrainingHistoryForSportsObject(String sportsObjectName) {
        ArrayList<TrainingHistory> trainingHistories = new ArrayList<>();
        for(TrainingHistory th : this.trainingHistories) {
            if(th.getDeletedAt() == null && th.getTraining().getSportsObject().getName().equals(sportsObjectName)) {
                trainingHistories.add(th);
            }
        }

        return trainingHistories;
    }
    
    public TrainingHistory getTrainingHistoryById(String id) {
    	TrainingHistory retVal = null;
    	for(TrainingHistory th: this.trainingHistories) {
    		if(th.getDeletedAt() == null && th.getId().equals(id)) {
    			retVal = th;
    			break;
    		}
    	}
    	return retVal;
    }
    
    public void updateTrainingHistory(TrainingHistory trainingHistory) {
    	int index = this.findIndexOf(trainingHistory);
    	if(index != -1) {
        	this.trainingHistories.set(index, trainingHistory);
        	this.write();
    	}
    }
    
    public int findIndexOf(TrainingHistory trainingHistory) {
    	int index = -1; 
    	
    	for(int i = 0; i < this.trainingHistories.size(); i++) {
    		if(this.trainingHistories.get(i).getDeletedAt() == null && this.trainingHistories.get(i).getId().equals(trainingHistory.getId())) {
    			index = i;
    			break;
    		}
    	}
    	
    	return index;
    }
    
    public void removeByBuyer(String id) {
    	for(TrainingHistory th : this.trainingHistories) {
    		if(th.getDeletedAt() == null && th.getBuyer().getId().equals(id)) {
    			th.setDeletedAt(LocalDateTime.now());
    		}
    	}
		this.write();
    }
	
}