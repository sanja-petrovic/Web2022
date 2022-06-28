package beans;

import com.google.gson.annotations.SerializedName;

public enum TrainingType {
	@SerializedName("Personalni")
	PERSONAL {
		public String toString() {
			return "Personalni";
		}
	},
	@SerializedName("Grupni")
	GROUP {
		public String toString() {
			return "Grupni";
		}
	}
}
