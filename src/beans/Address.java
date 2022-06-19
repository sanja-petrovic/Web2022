package beans;

import com.google.gson.annotations.Expose;

public class Address {
	
	@Expose
	private String street;	
	@Expose
	private String number;
	@Expose
	private String city;
	@Expose
	private String postcode;
	private String country;

	public Address(String street, String number, String city, String postcode, String country) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.postcode = postcode;
		this.country = country;
	}
	
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
	

}
