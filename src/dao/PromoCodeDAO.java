package dao;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.BuyersMembership;
import beans.Content;
import beans.PromoCode;
import beans.Trainer;
import util.adapters.LocalDateAdapter;
import util.adapters.LocalDateTimeAdapter;
import util.adapters.LocalTimeAdapter;

public class PromoCodeDAO {
	private String filePath = "resources/data/promocodes.json";
	private ArrayList<PromoCode> promocodes;
	private Gson gson;

	public PromoCodeDAO() {
		this.promocodes = new ArrayList<>();
		this.load();
	}
	
	public void createGson() {
		 this.gson = new GsonBuilder().setPrettyPrinting().registerTypeAdapter(LocalDate.class, new LocalDateAdapter()).registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter()).registerTypeAdapter(LocalTime.class, new LocalTimeAdapter()).excludeFieldsWithoutExposeAnnotation().create();
	}
	 public void load() {
			try {
				this.createGson();
			    Reader reader = Files.newBufferedReader(Paths.get(filePath));
			    this.promocodes = gson.fromJson(reader, new TypeToken<ArrayList<PromoCode>>() {}.getType());
			    reader.close();

			} catch (Exception ex) {
			    ex.printStackTrace();
			}
	}
	 
	public ArrayList<PromoCode> getPromoCodes() {
		return new ArrayList<PromoCode>(this.promocodes.stream()
				  .filter(u -> u.getDeletedAt() == null)
				  .collect(Collectors.toList()));
	}
	
	public PromoCode getPromoCodeById(String id) {
		PromoCode retVal = null;
		for(PromoCode promoCode : this.promocodes) {
			if(promoCode.getDeletedAt() == null && promoCode.getId().equals(id)) {
				retVal = promoCode;
				break;
			}
		}
		
		return retVal;	
	}
	
	public void addPromoCode(PromoCode promoCode) {
		this.promocodes.add(promoCode);
		this.write();
	}
	
	public void write() {
		try {
			this.createGson();
			FileWriter writer = new FileWriter(filePath, StandardCharsets.UTF_8);
			gson.toJson(this.promocodes, writer);
			writer.flush();
			writer.close();
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void updatePromoCode(PromoCode promoCode) {
		int index = this.findIndexOf(promoCode);
		if(index != -1) {
			this.promocodes.set(index, promoCode);
			this.write();
		}
	}
	
	public int findIndexOf(PromoCode promoCode) {
		int index = -1; 
    	for(int i = 0; i < this.promocodes.size(); i++) {
    		if(this.promocodes.get(i).getDeletedAt() == null && this.promocodes.get(i).getId().equals(promoCode.getId())) {
    			index = i;
    			break;
    		}
    	}
    	return index;
    }
	
}
