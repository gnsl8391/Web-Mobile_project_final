package com.ssafy.webmobilefinal.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.ssafy.webmobilefinal.vo.userSchedule;

@Mapper
public interface scheduleRepository {
	public List<userSchedule> getAllSchedule(int uid);
  public userSchedule getOneSchedule(int sche_id);
}
