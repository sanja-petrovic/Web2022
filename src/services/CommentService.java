package services;

import beans.Comment;
import beans.CommentStatus;
import dao.Repository;
import dto.CommentDTO;

public class CommentService {

	public static Comment postComment(CommentDTO dto) {
		Comment c = new Comment(Repository.getInstance().getBuyerDAO().getBuyerByUsername(dto.getBuyer()),
				Repository.getInstance().getSportsObjectDAO().getSportsObjectByIdCaseInsensitive(dto.getSportsObject()),
				dto.getContent(), dto.getGrade()
				);
		Repository.getInstance().getCommentDAO().addComment(c);
		
		return c;
	}
	
	
	public static Comment changeCommentStatus(String id, CommentStatus status) {
		Comment c = Repository.getInstance().getCommentDAO().getCommentById(id);
		c.setStatus(status);
		Repository.getInstance().getCommentDAO().updateComment(c);
		
		return c;
	}
	
}
