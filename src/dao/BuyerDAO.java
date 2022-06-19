package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.User;
import beans.UserType;
import util.LocalDateAdapter;
import util.LocalDateTimeAdapter;

public class BuyerDAO {
	private ArrayList<Buyer> buyers;
	private UserDAO userDAO;
	
	public BuyerDAO() {
		this.buyers = new ArrayList<>();
		this.userDAO = new UserDAO();
	}
	
	public void load() {
		for(User user : this.userDAO.getUsers()) {
			if(user.getUserType() == UserType.BUYER) {
				//convert user to buyer and add to list
			}
		}
	}

}
