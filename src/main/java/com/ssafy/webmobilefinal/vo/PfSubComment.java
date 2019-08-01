package com.ssafy.webmobilefinal.vo;

public class PfSubComment {
	int spfc_id;
	String pfid;
	String spfc_writer;
	String spfc_writerUid;
	String spfc_content;
	String spfc_date;
	int pfc_id;
	public int getSpfc_id() {
		return spfc_id;
	}
	public void setSpfc_id(int spfc_id) {
		this.spfc_id = spfc_id;
	}
	public String getPfid() {
		return pfid;
	}
	public void setPfid(String pfid) {
		this.pfid = pfid;
	}
	public String getSpfc_writer() {
		return spfc_writer;
	}
	public void setSpfc_writer(String spfc_writer) {
		this.spfc_writer = spfc_writer;
	}
	public String getSpfc_writerUid() {
		return spfc_writerUid;
	}
	public void setSpfc_writerUid(String spfc_writerUid) {
		this.spfc_writerUid = spfc_writerUid;
	}
	public String getSpfc_content() {
		return spfc_content;
	}
	public void setSpfc_content(String spfc_content) {
		this.spfc_content = spfc_content;
	}
	public String getSpfc_date() {
		return spfc_date;
	}
	public void setSpfc_date(String spfc_date) {
		this.spfc_date = spfc_date;
	}
	public int getPfc_id() {
		return pfc_id;
	}
	public void setPfc_id(int pfc_id) {
		this.pfc_id = pfc_id;
	}
	@Override
	public String toString() {
		return "PfSubComment [spfc_id=" + spfc_id + ", pfid=" + pfid + ", spfc_writer=" + spfc_writer
				+ ", spfc_writerUid=" + spfc_writerUid + ", spfc_content=" + spfc_content + ", spfc_date=" + spfc_date
				+ ", pfc_id=" + pfc_id + "]";
	}
}
