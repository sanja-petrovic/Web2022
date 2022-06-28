package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.Comment;
import beans.SportsObject;
import util.adapters.LocalDateTimeAdapter;

public class CommentDAO {

	private ArrayList<Comment> comments;
	private Gson gson;
	

	public void createGson() {
	    this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/comments.json"));
		    this.comments = gson.fromJson(reader, new TypeToken<ArrayList<Comment>>() {}.getType());
		    for(Comment c : this.comments) {
		    	this.fillData(c);
		    }
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public void fillData(Comment c) {
		Buyer b = Repository.getInstance().getBuyerDAO().getBuyerByUsername(c.getBuyer().getId());
		SportsObject s = Repository.getInstance().getSportsObjectDAO().getSportsObjectByIdCaseInsensitive(c.getSportsObject().getName());
		c.setBuyer(b);
		c.setSportsObject(s);
	}
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter("resources/data/comments.json");
			gson.toJson(this.comments, writer);
			writer.flush();
			writer.close();
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addComment(Comment c) {
		this.comments.add(c);
		this.write();
	}
	
	public ArrayList<Comment> getComments() {
		return this.comments;
	}
	
	public ArrayList<Comment> getCommentsBySportsObject(String name) {
		ArrayList<Comment> comments = new ArrayList<>();
		
		for(Comment c : this.comments) {
			if(c.getSportsObject().getName().equals(name)) {
				comments.add(c);
			}
		}
		
		return comments;
	}
	
	public void updateComment(Comment c) {
		int index = this.getIndexOfComment(c);
		if(index != -1) {
			this.comments.set(index, c);
		}
	}
	
	public int getIndexOfComment(Comment comment) {
		int index = -1;
		
		for(int i = 0; i < this.comments.size(); i++) {
			if(this.comments.get(i).getId().equals(comment.getId())) {
				index = i;
				break;
			}
		}
		
		return index;
	}
	
	public Comment getCommentById(String id) {
		Comment retVal = null;
		for(Comment c : this.comments) {
			if(c.getId().equals(id)) {
				retVal = c;
				break;
			}
		}
		
		return retVal;
	}
}
