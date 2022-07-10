package services;

import java.time.LocalDate;

import beans.PromoCode;
import dao.Repository;
import dto.CreatePromoCodeDTO;

public class PromoCodeService {
	
	public PromoCodeService() {
		
	}
	
	public static PromoCode createPromoCode(CreatePromoCodeDTO promoCodeDTO) {	
		PromoCode promocode = new PromoCode();
		promocode.setId(promoCodeDTO.getId());
		promocode.setDiscount(Double.parseDouble(promoCodeDTO.getDiscount()));
		promocode.setExpirationDateTime(LocalDate.parse(promoCodeDTO.getExpirationDateTime()));
		promocode.setMaximumUses(Integer.parseInt(promoCodeDTO.getMaximumUses()));
		Repository.getInstance().getPromoCodeDAO().addPromoCode(promocode);
		return promocode;
	}
	
	public static void removePromoCode(String id) {
		Repository.getInstance().getPromoCodeDAO().removePromoCode(id);
	}

}
