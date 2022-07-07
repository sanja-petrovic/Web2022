package beans;

import com.google.gson.annotations.SerializedName;

public enum UserType {
	@SerializedName("Admin")
	ADMIN {
        public String toString() {
            return "Administrator";
        }
	},
	@SerializedName("Menad�er")
	MANAGER {
        public String toString() {
            return "Menad�er";
        }
	},
	@SerializedName("Trener")
	TRAINER {
        public String toString() {
            return "Trener";
        }
	},
	@SerializedName("Kupac")
	BUYER {
        public String toString() {
            return "Kupac";
        }
	}
}
