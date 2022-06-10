package beans;

public enum Gender {
	FEMALE {
        public String toString() {
            return "Ženski";
        }
	},
	MALE {
        public String toString() {
            return "Muški";
        }
	},
}
