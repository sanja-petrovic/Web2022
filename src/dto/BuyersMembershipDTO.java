package dto;

public class BuyersMembershipDTO {

	private String buyerUsername;
	private String membershipId;
	private Double price;
	private String promocodeId;
	
	public String getBuyerUsername() {
		return buyerUsername;
	}
	public void setBuyerUsername(String buyerUsername) {
		this.buyerUsername = buyerUsername;
	}
	public String getMembershipId() {
		return membershipId;
	}
	public void setMembershipId(String membershipId) {
		this.membershipId = membershipId;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getPromocodeId() {
		return promocodeId;
	}
	public void setPromocodeId(String promocodeId) {
		this.promocodeId = promocodeId;
	}	
	
	
}
