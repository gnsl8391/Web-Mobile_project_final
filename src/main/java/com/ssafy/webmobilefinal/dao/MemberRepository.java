package com.ssafy.webmobilefinal.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.webmobilefinal.vo.Member;

@Mapper
public interface MemberRepository {
	public List<Member> getAllMember();
}
