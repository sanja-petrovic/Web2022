package beans;

import java.time.LocalDateTime;

public class Comment {
	private Buyer buyer;
	private SportsObject sportsObject;
	private String content;
	private int grade;
	private LocalDateTime deletedAt;
}
