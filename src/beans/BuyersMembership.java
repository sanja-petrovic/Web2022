package beans;

import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BuyersMembership extends Membership {
	
	@Expose
	@SerializedName("Buyer")
	private Buyer buyer;
	
	@Expose
	@SerializedName("PaymentDate")
	private LocalDateTime paymentDate;

	@Expose
	@SerializedName("DateTimeOfExpiration")
	private LocalDateTime dateTimeOfExpiration;
	
	@Expose
	@SerializedName("UsedTerms")
	private int usedTerms;
		
	@Expose
	@SerializedName("Status")
	private MembershipStatus status;
	
	public BuyersMembership(Membership membership) {
		super(membership);	
	}
	
	public Buyer getBuyer() {
		return buyer;
	}


	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}


	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}


	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}


	public LocalDateTime getDateTimeOfExpiration() {
		return dateTimeOfExpiration;
	}


	public void setDateTimeOfExpiration(LocalDateTime dateTimeOfExpiration) {
		this.dateTimeOfExpiration = dateTimeOfExpiration;
	}


	public int getUsedTerms() {
		return usedTerms;
	}


	public void setUsedTerms(int usedTerms) {
		this.usedTerms = usedTerms;
	}


	public MembershipStatus getStatus() {
		return status;
	}


	public void setStatus(MembershipStatus status) {
		this.status = status;
	}
}
