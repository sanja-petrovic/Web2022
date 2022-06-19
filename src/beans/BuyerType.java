package beans;

import java.time.LocalDateTime;

import com.google.gson.annotations.SerializedName;

public class BuyerType {
	@SerializedName("Tier")
	public String tier;
	@SerializedName("Discount")
	public double discount;
	@SerializedName("PointRequirement")
	public int pointRequirement;
	@SerializedName("DeletedAt")
	public LocalDateTime deletedAt;
	
	
}
