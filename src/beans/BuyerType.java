package beans;

import java.time.LocalDateTime;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BuyerType {
	@Expose
	@SerializedName("Tier")
	public String tier;
	@Expose
	@SerializedName("Discount")
	public double discount;
	@Expose
	@SerializedName("PointRequirement")
	public int pointRequirement;
	@Expose
	@SerializedName("DeletedAt")
	public LocalDateTime deletedAt;
	
	public BuyerType() { }

	public BuyerType(String tier, double discount, int pointRequirement) {
		this.tier = tier;
		this.discount = discount;
		this.pointRequirement = pointRequirement;
	}
	
	public String getTier() {
		return tier;
	}
	public void setTier(String tier) {
		this.tier = tier;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public int getPointRequirement() {
		return pointRequirement;
	}
	public void setPointRequirement(int pointRequirement) {
		this.pointRequirement = pointRequirement;
	}
	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}
	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}


	
	
}
