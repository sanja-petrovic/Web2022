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
		    	this.fillData(c);
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
			if(content.getType().equals(type)) {
				searchedContents.add(content);
			}
		}
		return searchedContents;
	}
	
	public List<Content> getContentsForSportsObject(String name) {
		List<Content> searchedContents = new ArrayList<Content>();
		for (Content content : this.contents) {
			
			if(content.getSportsObject().getName().equals(name)) {
				
				searchedContents.add(content);
			}
		}
		return searchedContents;
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
	
	
}
