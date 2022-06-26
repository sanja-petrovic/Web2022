package beans;

import com.google.gson.annotations.SerializedName;

public enum CommentStatus {
	@SerializedName("Na čekanju")
	PENDING {
		public String toString() {
			return "Na čekanju";
		}
	},
	
	@SerializedName("Odobren")
	APPROVED {
		public String toString() {
			return "Odobren";
		}
	},
	
	@SerializedName("Odbijen")
	DENIED {
		public String toString() {
			return "Odbijen";
		}
	}
}
