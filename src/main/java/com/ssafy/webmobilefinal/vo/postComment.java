package com.ssafy.webmobilefinal.vo;

public class postComment {
	int pc_id;
	String pid;
	String pc_writer;
	String pc_writerUid;
	String pc_content;
	String pc_date;
	public int getPc_id() {
		return pc_id;
	}
	public void setPc_id(int pc_id) {
		this.pc_id = pc_id;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPc_writer() {
		return pc_writer;
	}
	public void setPc_writer(String pc_writer) {
		this.pc_writer = pc_writer;
	}
	public String getPc_writerUid() {
		return pc_writerUid;
	}
	public void setPc_writerUid(String pc_writerUid) {
		this.pc_writerUid = pc_writerUid;
	}
	public String getPc_content() {
		return pc_content;
	}
	public void setPc_content(String pc_content) {
		this.pc_content = pc_content;
	}
	public String getPc_date() {
		return pc_date;
	}
	public void setPc_date(String pc_date) {
		this.pc_date = pc_date;
	}
	@Override
	public String toString() {
		return "postComment [pc_id=" + pc_id + ", pid=" + pid + ", pc_writer=" + pc_writer + ", pc_writerUid="
				+ pc_writerUid + ", pc_content=" + pc_content + ", pc_date=" + pc_date + "]";
	}
}
