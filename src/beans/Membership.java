package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Membership {

	@Expose
	@SerializedName("Id")
	private String id;
	
	@SerializedName("Type")
	private String type;
	
	@SerializedName("PaymentDate")
	private LocalDate paymentDate;
	
	@SerializedName("DateTimeOfExpiration")
	private LocalDateTime dateTimeOfExpiration;
	
	@SerializedName("Price")
	private double price;
	
	@SerializedName("Buyer")
	private Buyer buyer;
	
	@SerializedName("Status")
	private MembershipStatus status;
	
	@SerializedName("DailyLimit")
	private int dailyLimit;
	
	@SerializedName("DeletedAt")
	private LocalDateTime deletedAt;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public LocalDate getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}
	public LocalDateTime getDateTimeOfExpiration() {
		return dateTimeOfExpiration;
	}
	public void setDateTimeOfExpiration(LocalDateTime dateTimeOfExpiration) {
		this.dateTimeOfExpiration = dateTimeOfExpiration;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Buyer getBuyer() {
		return buyer;
	}
	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}
	public MembershipStatus getStatus() {
		return status;
	}
	public void setStatus(MembershipStatus status) {
		this.status = status;
	}
	public int getDailyLimit() {
		return dailyLimit;
	}
	public void setDailyLimit(int dailyLimit) {
		this.dailyLimit = dailyLimit;
	}
}
