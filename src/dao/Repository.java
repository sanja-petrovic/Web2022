package dao;

public class Repository {
	
	private UserDAO userDAO;
	private BuyerDAO buyerDAO;
	public static Repository instance;
	
	private Repository() { }
	
	public static Repository getInstance() {
		if(instance == null) {
			instance = new Repository();
			instance.setUserDAO(new UserDAO());
			instance.setBuyerDAO(new BuyerDAO());
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

	public BuyerDAO getBuyerDAO() {
		return buyerDAO;
	}

	public void setBuyerDAO(BuyerDAO buyerDAO) {
		this.buyerDAO = buyerDAO;
	}

}
