package util.parsers;

import beans.UserType;

public class UserTypeParser {

	public static UserType parse(String userType) {
		UserType parsed;
		if(userType.trim().toLowerCase().startsWith("m")) {
			parsed = UserType.MANAGER;
		} else if(userType.trim().toLowerCase().startsWith("t")) {
			parsed = UserType.TRAINER;
		} else {
			parsed = UserType.BUYER;
		}
		
		return parsed;
	}
}
