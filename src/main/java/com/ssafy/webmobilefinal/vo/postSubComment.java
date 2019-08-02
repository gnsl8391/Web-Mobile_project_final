package com.ssafy.webmobilefinal.vo;

public class postSubComment {
	int spc_id;
	String pid;
	String spc_writer;
	String spc_writerUid;
	String spc_content;
	String spc_date;
	int pc_id;
	
	public int getSpc_id() {
		return spc_id;
	}
	public void setSpc_id(int spc_id) {
		this.spc_id = spc_id;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getSpc_writer() {
		return spc_writer;
	}
	public void setSpc_writer(String spc_writer) {
		this.spc_writer = spc_writer;
	}
	public String getSpc_writerUid() {
		return spc_writerUid;
	}
	public void setSpc_writerUid(String spc_writerUid) {
		this.spc_writerUid = spc_writerUid;
	}
	public String getSpc_content() {
		return spc_content;
	}
	public void setSpc_content(String spc_content) {
		this.spc_content = spc_content;
	}
	public String getSpc_date() {
		return spc_date;
	}
	public void setSpc_date(String spc_date) {
		this.spc_date = spc_date;
	}
	public int getPc_id() {
		return pc_id;
	}
	public void setPc_id(int pc_id) {
		this.pc_id = pc_id;
	}
	@Override
	public String toString() {
		return "postSubComment [spc_id=" + spc_id + ", pid=" + pid + ", spc_writer=" + spc_writer + ", spc_writerUid="
				+ spc_writerUid + ", spc_content=" + spc_content + ", spc_date=" + spc_date + ", pc_id=" + pc_id + "]";
	}
}
