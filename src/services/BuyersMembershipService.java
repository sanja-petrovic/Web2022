package services;

import java.time.LocalDateTime;

import beans.Buyer;
import beans.BuyersMembership;
import beans.Membership;
import beans.MembershipStatus;
import beans.MembershipType;
import dao.Repository;
import dto.BuyersMembershipDTO;

public class BuyersMembershipService {
	
	public BuyersMembershipService() {
		
	}
	
	public static BuyersMembership createMembership(BuyersMembershipDTO buyersmembershipDTO) {
		Buyer buyer = Repository.getInstance().getBuyerDAO().getBuyerByUsername(buyersmembershipDTO.getBuyerUsername());
		String membershipId = buyersmembershipDTO.getMembershipId();
		Membership membership = Repository.getInstance().getMembershipDAO().getMembershipById(membershipId);
		membership.setPrice(buyersmembershipDTO.getPrice());
		BuyersMembership newBuyersMembership = new BuyersMembership(membership);
		newBuyersMembership.setBuyer(buyer);
		newBuyersMembership.setPaymentDate(LocalDateTime.now());
		if(membership.getMembershipType().equals(MembershipType.MONTHLY)) {
			newBuyersMembership.setDateTimeOfExpiration(LocalDateTime.now().plusMonths(1));
		}
		else {
			newBuyersMembership.setDateTimeOfExpiration(LocalDateTime.now().plusMonths(12));
		}
		newBuyersMembership.setStatus(MembershipStatus.ACTIVE);
		newBuyersMembership.setUsedTerms(0);
		
		buyer.setMembership(membership);
		Repository.getInstance().getBuyerDAO().updateBuyer(buyer);
		if(Repository.getInstance().getBuyersMembershipDAO().getMembershipByBuyerId(buyer.getId()) != null){
			Repository.getInstance().getBuyersMembershipDAO().updateBuyersMembership(newBuyersMembership);
		}
		else {
			Repository.getInstance().getBuyersMembershipDAO().addBuyersMembership(newBuyersMembership);
		}
		return newBuyersMembership;
	}

}
