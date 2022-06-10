package beans;

import java.time.LocalDateTime;

public class PromoCode {
	private String id;
	private LocalDateTime expirationDateTime;
	private int maximumUses;
	private double discount;
	private LocalDateTime deletedAt;
	
	public PromoCode(String id, LocalDateTime expirationDateTime, int maximumUses, double discount) {
		this.id = id;
		this.expirationDateTime = expirationDateTime;
		this.maximumUses = maximumUses;
		this.discount = discount;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getExpirationDateTime() {
		return expirationDateTime;
	}

	public void setExpirationDateTime(LocalDateTime expirationDateTime) {
		this.expirationDateTime = expirationDateTime;
	}

	public int getMaximumUses() {
		return maximumUses;
	}

	public void setMaximumUses(int maximumUses) {
		this.maximumUses = maximumUses;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}
	
	
}
