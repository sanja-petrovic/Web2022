package beans;

import com.google.gson.annotations.SerializedName;

public enum UserType {
	@SerializedName("Admin")
	ADMIN {
        public String toString() {
            return "Administrator";
        }
	},
	@SerializedName("Manager")
	MANAGER {
        public String toString() {
            return "Menadžer";
        }
	},
	@SerializedName("Trainer")
	TRAINER {
        public String toString() {
            return "Trener";
        }
	},
	@SerializedName("Buyer")
	BUYER {
        public String toString() {
            return "Kupac";
        }
	}
}
