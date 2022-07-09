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
	
	public static void removeSportsObject(String id) {
		Repository.getInstance().getSportsObjectDAO().removeSportsObject(id);
		Repository.getInstance().getManagerDAO().unassignManagerFromSportsObject(id);
		Repository.getInstance().getCommentDAO().removeCommentsBySportsObject(id);
		Repository.getInstance().getContentsDAO().removeContentBySportsObject(id);
		Repository.getInstance().getTrainingHistoryDAO().removeBySportsObject(id);
		ArrayList<String> membershipIdsToRemove = Repository.getInstance().getMembershipDAO().removeMembershipBySportsObject(id);
		for(String membershipId : membershipIdsToRemove) {
			MembershipService.removeMembership(membershipId);
		}
	}
}
