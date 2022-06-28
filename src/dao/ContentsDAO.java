package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Content;
import util.adapters.LocalDateTimeAdapter;

public class ContentsDAO {

	private String filePath = "resources/data/contents.json";
	private ArrayList<Content> contents;

	public ContentsDAO() {
		this.contents = new ArrayList<>();
		this.load();
	}

	public void load() {
		try {
		    Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
		    Reader reader = Files.newBufferedReader(Paths.get(filePath));
		    this.contents = gson.fromJson(reader, new TypeToken<ArrayList<Content>>() {}.getType());
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	

	public ArrayList<Content> getContents() {
		this.load();
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
			
			if(content.getSportsObjectName().equals(name)) {
				
				searchedContents.add(content);
			}
		}
		return searchedContents;
	}
	
}
