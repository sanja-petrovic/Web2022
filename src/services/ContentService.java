package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;

import beans.Content;
import dao.Repository;
import dto.EditContentDTO;

public class ContentService {
	
	public ContentService() {
		
	}
	
	public static Content editContent(EditContentDTO editContentDTO, Content content) {
		content.setName(editContentDTO.getName());
		content.setContentType(editContentDTO.getType());
		content.setDurationMinutes(editContentDTO.getDuration());
		content.setDescription(editContentDTO.getDescription());
		content.setPicture(editContentDTO.getPicture());
		content.setId(editContentDTO.getId());
		Repository.getInstance().getContentsDAO().editContent(content);
		return content;
		
	}

}
