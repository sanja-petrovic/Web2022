package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PromoCode {
	
	@Expose
	@SerializedName("Id")
	private String id;
	
	@Expose
	@SerializedName("ExpirationDateTime")
	private LocalDate expirationDateTime;
	
	@Expose
	@SerializedName("MaximumUses")
	private int maximumUses;
	
	@Expose
	@SerializedName("Discount")
	private double discount;
	
	private LocalDateTime deletedAt;
	
	
	public PromoCode() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PromoCode(String id, LocalDate expirationDateTime, int maximumUses, double discount) {
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

	public LocalDate getExpirationDateTime() {
		return expirationDateTime;
	}

	public void setExpirationDateTime(LocalDate expirationDateTime) {
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
