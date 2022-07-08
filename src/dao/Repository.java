package dao;

public class Repository {
	
	private UserDAO userDAO;
	private BuyerDAO buyerDAO;
	private BuyersMembershipDAO buyersMembershipDAO;
	private MembershipDAO membershipDAO;
	private BuyerTypeDAO buyerTypeDAO;
	private SportsObjectDAO sportsObjectDAO;
	private ManagerDAO managerDAO;
	private ContentsDAO contentsDAO;
	private TrainingHistoryDAO trainingHistoryDAO;
	private TrainingDAO trainingDAO;
	private TrainerDAO trainerDAO;
	private AdministratorDAO administratorDAO;
	private CommentDAO commentDAO;
	private PromoCodeDAO promoCodeDAO;
	public static Repository instance;
	
	
	private Repository() { }
	
	public static Repository getInstance() {
		if(instance == null) {
			instance = new Repository();
			instance.setUserDAO(new UserDAO());
			instance.setBuyerTypeDAO(new BuyerTypeDAO());
			instance.setSportsObjectDAO(new SportsObjectDAO());
			instance.setManagerDAO(new ManagerDAO());
			instance.setContentsDAO(new ContentsDAO());
			instance.setMembershipDAO(new MembershipDAO());
			instance.setBuyerDAO(new BuyerDAO());
			instance.setBuyersMembershipDAO(new BuyersMembershipDAO());
			instance.setTrainerDAO(new TrainerDAO());
			instance.setTrainingDAO(new TrainingDAO());
			instance.setCommentDAO(new CommentDAO());
			instance.setTrainingHistoryDAO(new TrainingHistoryDAO());
			instance.setAdministratorDAO(new AdministratorDAO());
			instance.setPromoCodeDAO(new PromoCodeDAO());
		}
		return instance;
	}
	
	public void loadData() {
		this.trainingDAO.init();
		this.trainerDAO.init();
		this.trainingHistoryDAO.fillData();
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

	public MembershipDAO getMembershipDAO() {
		return membershipDAO;
	}

	public void setMembershipDAO(MembershipDAO membershipDAO) {
		this.membershipDAO = membershipDAO;
	}

	public BuyersMembershipDAO getBuyersMembershipDAO() {
		return buyersMembershipDAO;
	}

	public void setBuyersMembershipDAO(BuyersMembershipDAO buyersMembershipDAO) {
		this.buyersMembershipDAO = buyersMembershipDAO;
	}

	public BuyerTypeDAO getBuyerTypeDAO() {
		return buyerTypeDAO;
	}

	public void setBuyerTypeDAO(BuyerTypeDAO buyerTypeDAO) {
		this.buyerTypeDAO = buyerTypeDAO;
	}

	public SportsObjectDAO getSportsObjectDAO() {
		return sportsObjectDAO;
	}

	public void setSportsObjectDAO(SportsObjectDAO sportsObjectDAO) {
		this.sportsObjectDAO = sportsObjectDAO;
	}

	public ManagerDAO getManagerDAO() {
		return managerDAO;
	}

	public void setManagerDAO(ManagerDAO managerDAO) {
		this.managerDAO = managerDAO;
	}

	public ContentsDAO getContentsDAO() {
		return contentsDAO;
	}

	public void setContentsDAO(ContentsDAO contentsDAO) {
		this.contentsDAO = contentsDAO;
	}
	
	
	public TrainerDAO getTrainerDAO() {
		return trainerDAO;
	}

	public void setTrainerDAO(TrainerDAO trainerDAO) {
		this.trainerDAO = trainerDAO;
	}

	public TrainingDAO getTrainingDAO() {
		return trainingDAO;
	}

	public void setTrainingDAO(TrainingDAO trainingDAO) {
		this.trainingDAO = trainingDAO;
	}

	public TrainingHistoryDAO getTrainingHistoryDAO() {
		return trainingHistoryDAO;
	}

	public void setTrainingHistoryDAO(TrainingHistoryDAO trainingHistoryDAO) {
		this.trainingHistoryDAO = trainingHistoryDAO;
	}

	public void setAdministratorDAO(AdministratorDAO administratorDAO) {
		this.administratorDAO = administratorDAO;
	}
	
	public AdministratorDAO getAdministratorDAO() {
		return administratorDAO;
	}

	public CommentDAO getCommentDAO() {
		return commentDAO;
	}

	public void setCommentDAO(CommentDAO commentDAO) {
		this.commentDAO = commentDAO;
	}

	public PromoCodeDAO getPromoCodeDAO() {
		return promoCodeDAO;
	}

	public void setPromoCodeDAO(PromoCodeDAO promoCodeDAO) {
		this.promoCodeDAO = promoCodeDAO;
	}
	
	

}
