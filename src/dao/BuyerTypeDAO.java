package dao;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.BuyerType;
import util.adapters.LocalDateTimeAdapter;;

public class BuyerTypeDAO {

	private ArrayList<BuyerType> types;
	private Gson gson;
	
	public BuyerTypeDAO() {
		this.types = new ArrayList<>();
	}

	public ArrayList<BuyerType> getTypes() {
		return types;
	}

	public void setTypes(ArrayList<BuyerType> types) {
		this.types = types;
	}
	
	public void createGson() {
	    this.gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).create();
	}
	
	public void load() {
		try {
			this.createGson();
		    Reader reader = Files.newBufferedReader(Paths.get("resources/data/buyertypes.json"));
		    this.types = gson.fromJson(reader, new TypeToken<ArrayList<BuyerType>>() {}.getType());
		    reader.close();

		} catch (Exception ex) {
		    ex.printStackTrace();
		}
	}
	
	public BuyerType getBuyerTypeByTier(String tier) {
		this.load();
		BuyerType retVal = null;
		for(BuyerType type : this.types) {
			if(type.tier.equals(tier)) {
				retVal = type;
				break;
			}
		}
		
		return retVal;
	}
}
