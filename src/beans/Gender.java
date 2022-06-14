package beans;

import com.google.gson.annotations.SerializedName;

public enum Gender {
	@SerializedName("Female")
	FEMALE {
        public String toString() {
            return "Ženski";
        }
	},
	@SerializedName("Male")
	MALE {
        public String toString() {
            return "Muški";
        }
	},
}
