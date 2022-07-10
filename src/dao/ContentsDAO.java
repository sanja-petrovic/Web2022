package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Content;
import beans.SportsObject;
import beans.Trainer;
import util.adapters.LocalDateTimeAdapter;

public class ContentsDAO {

	private String filePath = "resources/data/contents.json";
	private ArrayList<Content> contents;
	private Gson gson;

	public ContentsDAO() {
		this.contents = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
		    this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get(filePath));
		    this.contents = gson.fromJson(reader, new TypeToken<ArrayList<Content>>() {}.getType());
		    for(Content c : this.contents) {
		    	if(c.getDeletedAt() == null) {
		    		this.fillData(c);
		    	}
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Content c) {
		if(c.getSportsObject() != null)
		{
			SportsObject s = Repository.getInstance().getSportsObjectDAO().getSportsObjectByName(c.getSportsObject().getName());
			c.setSportsObject(s);	
		}
	}
	
	public ArrayList<Content> getContents() {

		return this.contents;
	}

	public List<Content> getContentsByType(String type) {
		List<Content> searchedContents = new ArrayList<Content>();
		for (Content content : this.contents) {
			if(content.getDeletedAt() == null && content.getType().equals(type)) {
				searchedContents.add(content);
			}
		}
		return searchedContents;
	}
	
	public List<Content> getContentsForSportsObject(String name) {
		List<Content> searchedContents = new ArrayList<Content>();
		for (Content content : this.contents) {
			
			if(content.getDeletedAt() == null && content.getSportsObject().getName().equals(name)) {
				
				searchedContents.add(content);
			}
		}
		return searchedContents;
	}
	
	public Content getContentByNameCaseInsensitive(String name) {
		Content retVal = null;
		for(Content content : this.contents) {
			if(content.getName().trim().toLowerCase().equals(name.trim().toLowerCase())) {
				retVal = content;
				break;
			}
		}
		
		return retVal;
	} 
	public SportsObject getSportsObjectByContentId(String id) {
		SportsObject retVal = null;
		for(Content content : this.contents) {
			if(content.getDeletedAt() == null && content.getId().equals(id)) {
				retVal = content.getSportsObject();
				break;
			}
		}
		
		return retVal;	
	}
	public Content getContentById(String id) {
		Content retVal = null;
		for(Content content : this.contents) {
			if(content.getDeletedAt() == null && content.getId().equals(id)) {
				retVal = content;
				break;
			}
		}
		
		return retVal;	
	}
	
	public void addContent(Content content) {
		this.contents.add(content);
		this.write();
	}
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/contents.json", StandardCharsets.UTF_8);
			gson.toJson(this.contents, writer);
			writer.flush();
			writer.close();
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void editContent(Content content) {
		int index = this.findIndexOf(content);
		 if(index != -1) {
	            this.contents.set(index, (Content) content);
	            this.write();
	     }
	}
	public int findIndexOf(Content content) {
        int index = -1;
        for(int i = 0; i < this.contents.size(); i++) {
            if(this.contents.get(i).getDeletedAt() == null && this.contents.get(i).getId().equals(content.getId())) {
                index = i;
                break;
            }
        }

        return index;
    } 
	
	public void removeContent(String id) {
		for(Content c : this.getContents()) {
			if(c.getId().equals(id)) {
				c.setDeletedAt(LocalDateTime.now());
				this.write();
				break;
			}
		}
	}
	
	public void removeContentBySportsObject(String id) {
		for(Content c : this.getContents()) {
			if(c.getSportsObject().getName().equals(id)) {
				c.setDeletedAt(LocalDateTime.now());
			}
		}
		this.write();
	}
	
}
