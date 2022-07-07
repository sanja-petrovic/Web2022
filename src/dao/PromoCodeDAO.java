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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.reflect.TypeToken;

import beans.PromoCode;
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
		return this.promocodes;
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
	
}
