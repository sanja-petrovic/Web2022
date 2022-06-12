package dao;

public class Repository {
	
	private UserDAO userDAO;
	public static Repository instance;
	
	private Repository() { }
	
	public static Repository getInstance() {
		if(instance == null) {
			instance = new Repository();
			instance.setUserDAO(new UserDAO());
		}
		return instance;
	}
	
	public void loadData() {
		this.userDAO.load();
	}

	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

}
