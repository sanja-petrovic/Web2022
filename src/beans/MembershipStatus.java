package beans;

import com.google.gson.annotations.SerializedName;

public enum MembershipStatus {
	@SerializedName("Aktivna")
	ACTIVE {
		public String toString() {
			return "Aktivna";
		}
	},
	@SerializedName("Neaktivna")
	INACTIVE {
		public String toString() {
			return "Neaktivna";
		}
	}
}
