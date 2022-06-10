package beans;

public enum SportsObjectStatus {
	WORKING {
		public String toString() {
			return "Radi";
		}
	},
	NOT_WORKING {
		public String toString() {
			return "Ne radi";
		}
	}
}
