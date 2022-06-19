package beans;

import com.google.gson.annotations.SerializedName;

public enum Gender {
	@SerializedName("Ženski")
	FEMALE {
        public String toString() {
            return "Ženski";
        }
	},
	@SerializedName("Muški")
	MALE {
        public String toString() {
            return "Muški";
        }
	},
}
