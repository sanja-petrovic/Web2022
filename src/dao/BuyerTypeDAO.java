package dao;
import java.util.ArrayList;

import beans.BuyerType;;

public class BuyerTypeDAO {

	ArrayList<BuyerType> types;
	
	public BuyerTypeDAO() {
		this.types = new ArrayList<>();
	}

	public ArrayList<BuyerType> getTypes() {
		return types;
	}

	public void setTypes(ArrayList<BuyerType> types) {
		this.types = types;
	}
	
	public BuyerType getBuyerTypeInfoByTier(String tier) {
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
