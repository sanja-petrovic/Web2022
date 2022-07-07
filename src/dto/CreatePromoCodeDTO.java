package dto;

public class CreatePromoCodeDTO {
	
	private String id;
	private String discount;
	private String maximumUses;
	private String expirationDateTime;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	public String getMaximumUses() {
		return maximumUses;
	}
	public void setMaximumUses(String maximumUses) {
		this.maximumUses = maximumUses;
	}
	public String getExpirationDateTime() {
		return expirationDateTime;
	}
	public void setExpirationDateTime(String expirationDateTime) {
		this.expirationDateTime = expirationDateTime;
	}
	
	
	
}
