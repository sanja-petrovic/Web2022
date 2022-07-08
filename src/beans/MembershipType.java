package beans;

import com.google.gson.annotations.SerializedName;

public enum MembershipType {
	
	@SerializedName("Mesečna")
	MONTHLY {
		public String toString() {			
			return "Mesečna";
        }
	},
	@SerializedName("Godišnja")
	ANNUAL {
        public String toString() {
            return "Godišnja";
        }
	}
}
