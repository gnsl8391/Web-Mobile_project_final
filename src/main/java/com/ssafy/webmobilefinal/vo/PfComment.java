package com.ssafy.webmobilefinal.vo;

public class pfComment {
	int pfc_id;
	String pfid;
	String pfc_writer;
	String pfc_writerUid;
	String pfc_content;
	String pfc_date;
	
	public pfComment(int pfc_id, String pfid, String pfc_writer, String pfc_writerUid, String pfc_content,
			String pfc_date) {
		super();
		this.pfc_id = pfc_id;
		this.pfid = pfid;
		this.pfc_writer = pfc_writer;
		this.pfc_writerUid = pfc_writerUid;
		this.pfc_content = pfc_content;
		this.pfc_date = pfc_date;
	}
	public int getPfc_id() {
		return pfc_id;
	}
	public void setPfc_id(int pfc_id) {
		this.pfc_id = pfc_id;
	}
	public String getPfid() {
		return pfid;
	}
	public void setPfid(String pfid) {
		this.pfid = pfid;
	}
	public String getPfc_writer() {
		return pfc_writer;
	}
	public void setPfc_writer(String pfc_writer) {
		this.pfc_writer = pfc_writer;
	}
	public String getPfc_writerUid() {
		return pfc_writerUid;
	}
	public void setPfc_writerUid(String pfc_writerUid) {
		this.pfc_writerUid = pfc_writerUid;
	}
	public String getPfc_content() {
		return pfc_content;
	}
	public void setPfc_content(String pfc_content) {
		this.pfc_content = pfc_content;
	}
	public String getPfc_date() {
		return pfc_date;
	}
	public void setPfc_date(String pfc_date) {
		this.pfc_date = pfc_date;
	}
	@Override
	public String toString() {
		return "Comment [pfc_id=" + pfc_id + ", pfid=" + pfid + ", pfc_writer=" + pfc_writer + ", pfc_writerUid="
				+ pfc_writerUid + ", pfc_content=" + pfc_content + ", pfc_date=" + pfc_date + "]";
	}
}
