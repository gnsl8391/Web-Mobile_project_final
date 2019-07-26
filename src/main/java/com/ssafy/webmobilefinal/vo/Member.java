package com.ssafy.webmobilefinal.vo;

public class Member {
	int idx;
	String id;
	String name;
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "Member [idx=" + idx + ", id=" + id + ", name=" + name + "]";
	}
}
