package com.ssafy.webmobilefinal.vo;

public class userSchedule {
    int sche_id;
	String sche_title;
	String sche_details;
	String sche_date;
	int scheCat_id;
	String scheCat_name;
	String scheCat_img;
	String uid;
	
	public String getScheCat_name() {
		return scheCat_name;
	}
	public void setScheCat_name(String scheCat_name) {
		this.scheCat_name = scheCat_name;
	}
	public String getScheCat_img() {
		return scheCat_img;
	}
	public void setScheCat_img(String scheCat_img) {
		this.scheCat_img = scheCat_img;
	}
	
	public int getSche_id() {
		return sche_id;
	}
	public void setSche_id(int sche_id) {
		this.sche_id = sche_id;
	}
	public String getSche_title() {
		return sche_title;
	}
	public void setSche_title(String sche_title) {                                      
		this.sche_title = sche_title;
	}
	public String getSche_details() {
		return sche_details;
	}
	public void setSche_details(String sche_details) {
		this.sche_details = sche_details;
	}
	public String getSche_date() {
		return sche_date;
	}
	public void setSche_date(String sche_date) {
		this.sche_date = sche_date;
	}
	public int getScheCat_id() {
		return scheCat_id;
	}
	public void setScheCat_id(int scheCat_id) {
		this.scheCat_id = scheCat_id;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	@Override
	public String toString() {
		return "userSchedule [sche_id=" + sche_id + ", sche_title=" + sche_title + ", sche_details=" + sche_details
				+ ", sche_date=" + sche_date + ", scheCat_id=" + scheCat_id + ", scheCat_name=" + scheCat_name
				+ ", uid=" + uid + "]";
	}
} 