package beans;

public enum MembershipStatus {
	ACTIVE {
		public String toString() {
			return "Aktivna";
		}
	},
	INACTIVE {
		public String toString() {
			return "Neaktivna";
		}
	}
}
