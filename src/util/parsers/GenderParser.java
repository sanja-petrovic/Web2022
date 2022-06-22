package util.parsers;

import beans.Gender;

public class GenderParser {

	public static Gender parse(String gender) {
		Gender parsed;
		if(gender.trim().toLowerCase().startsWith("m")) {
			parsed = Gender.MALE;
		} else {
			parsed = Gender.FEMALE;
		}
		
		return parsed;
	}
}
