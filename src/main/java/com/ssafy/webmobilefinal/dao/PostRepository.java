package com.ssafy.webmobilefinal.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.webmobilefinal.vo.postComment;
import com.ssafy.webmobilefinal.vo.postSubComment;

@Mapper
public interface PostRepository {
	// 포스트 댓글 관리
	public List<postComment> getAllPostComment(String pid);
	public int addPostComment(HashMap<String, String> map);
	public int delPostComment(int pc_id);
	
	// 포스트 대댓글 관리
	public List<postSubComment> getAllPostSubComment(String pc_id);
	public int addPostSubComment(HashMap<String, String> map);
	public int delPostSubComment(int spc_id);
}
