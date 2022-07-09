package services;

import dao.Repository;

public class MembershipService {
	
	public static void removeMembership(String id) {
		Repository.getInstance().getMembershipDAO().removeMembership(id);
		Repository.getInstance().getBuyersMembershipDAO().removeBuyersMembership(id);
		Repository.getInstance().getBuyerDAO().setMembershipToNull(id);
	}

}
