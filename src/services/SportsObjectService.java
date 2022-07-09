package services;

import java.util.ArrayList;

import beans.Comment;
import beans.CommentStatus;
import beans.SportsObject;
import dao.Repository;

public class SportsObjectService {

	public static double calculateRating(SportsObject sportsObject) {
		double sum = 0.0;
		double count = 0;
		
		ArrayList<Comment> comments = Repository.getInstance().getCommentDAO().getCommentsBySportsObject(sportsObject.getName());
		
		for(Comment c : comments) {
			if(c.getStatus().equals(CommentStatus.APPROVED)) {
				sum += c.getGrade();
				count++;
			}
		}
		
		return sum/count;
	}
}
