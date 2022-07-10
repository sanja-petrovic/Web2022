package services;

import java.util.ArrayList;

import beans.Comment;
import beans.CommentStatus;
import beans.SportsObject;
import dao.Repository;
import dto.CommentDTO;

public class CommentService {

	public static Comment postComment(CommentDTO dto) {
		SportsObject so = Repository.getInstance().getSportsObjectDAO().getSportsObjectByIdCaseInsensitive(dto.getSportsObject());
		Comment c = new Comment(Repository.getInstance().getBuyerDAO().getBuyerById(dto.getBuyer()),
				so,
				dto.getContent(), dto.getGrade()
				);
		Repository.getInstance().getCommentDAO().addComment(c);
		
		return c;
	}
	
	
	public static Comment changeCommentStatus(String id, CommentStatus status) {
		Comment c = Repository.getInstance().getCommentDAO().getCommentById(id);
		c.setStatus(status);
		if(status.equals(CommentStatus.APPROVED)) {
			SportsObject s = Repository.getInstance().getSportsObjectDAO().updateRating(c.getSportsObject(), SportsObjectService.calculateRating(c.getSportsObject()));
			c.setSportsObject(s);
		}
		Repository.getInstance().getCommentDAO().updateComment(c);
		
		return c;
	}
	
	public static void removeByBuyer(String id) {
		Repository.getInstance().getCommentDAO().removeCommentsByUser(id);
	}
	
	public static boolean hasCommentedBefore(String buyer, String sportsObject) {
		ArrayList<Comment> comments = Repository.getInstance().getCommentDAO().getCommentsBySportsObject(sportsObject);
		for(Comment c : comments) {
			if(c.getBuyer().getUsername().equals(buyer)) {
				return true;
			}
		}
		
		return false;
	}
	
}
