package com.ssafy.webmobilefinal.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.webmobilefinal.vo.pfComment;
import com.ssafy.webmobilefinal.vo.pfSubComment;

@Mapper
public interface PortfolioRepository {
	// 포트폴리오 댓글 관리
	public List<pfComment> getAllPfComment(String pfid);
	public int addPfComment(HashMap<String, String> map);
	public int delPfComment(int pfc_id);
	
	// 포트폴리오 대댓글 관리
	public List<pfSubComment> getAllPfSubComment(String pfc_id);
	public int addPfSubComment(HashMap<String, String> map);
	public int delPfSubComment(int spfc_id);
}
