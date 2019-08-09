package com.ssafy.webmobilefinal.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.ssafy.webmobilefinal.vo.userSchedule;

@Mapper
public interface ScheduleRepository {
	public List<userSchedule> getAllSchedule(String uid);
  public userSchedule getOneSchedule(int sche_id);
  public int regToDoList(HashMap<String,String> hm);
  public int deleteScehdule(int sche_id);

  public List<userSchedule> getCatList();
}
 
