package beans;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public enum UserType {
	@Expose
	@SerializedName("Admin")
	ADMIN {
        public String toString() {
            return "Administrator";
        }
	},
	@Expose
	@SerializedName("Manager")
	MANAGER {
        public String toString() {
            return "Menadžer";
        }
	},
	@Expose
	@SerializedName("Trainer")
	TRAINER {
        public String toString() {
            return "Trener";
        }
	},
	@Expose
	@SerializedName("Buyer")
	BUYER {
        public String toString() {
            return "Kupac";
        }
	}
}
