package com.ssafy.webmobilefinal.controller;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import com.ssafy.webmobilefinal.dao.PortfolioRepository;
import com.ssafy.webmobilefinal.dao.PostRepository;
import com.ssafy.webmobilefinal.dao.ScheduleRepository;
import com.ssafy.webmobilefinal.vo.pfComment;
import com.ssafy.webmobilefinal.vo.pfSubComment;
import com.ssafy.webmobilefinal.vo.postComment;
import com.ssafy.webmobilefinal.vo.postSubComment;
import com.ssafy.webmobilefinal.vo.userSchedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonController {
	@Autowired
    private PortfolioRepository pfRepo;

	@Autowired
    private PostRepository postRepo;

	@Autowired
	private ScheduleRepository scheRepo;

	// @RequestMapping(value="/PortfolioDetail", method=RequestMethod.POST)
	// public ModelAndView getpf(String portfolioUrl){
	// 	System.out.println("!!!************************************************!!!!!!!!!!");
	// 	System.out.println(portfolioUrl);
	// 	ModelAndView mav= new ModelAndView();
	// 	mav.setViewName("PortfolioDetail"); // 이거 안됨
	// 	return mav;
	// }

		// const axios = require("axios");
		// let formData = new FormData();
		// formData.append("portfolioUrl", uid);
		// axios.post("/PortfolioDetail"
		// 	, formData)
		// 	.then((Resopnse) => {
		// 		console.log(Response);
		// 	}).catch((ex) => {
		// 		console.log(ex);
		// 	});

	/***********포트폴리오 댓글***********/
	/*
	 * 댓글, 대댓글 조회 : getPfComment, getPfSubComment
	 * 댓글, 대댓글 등록 : regPfComment, regPfSubComment
	 * 댓글, 대댓글 삭제 : delPfComment, delPfSubComment
	 */

	@RequestMapping(value="/getPfComment", method=RequestMethod.POST)
	public @ResponseBody List<pfComment> getPfComm(String id){
		// 포트폴리오 댓글 가져오기
		return pfRepo.getAllPfComment(id);
	}

	@RequestMapping(value="/regPfComment", method=RequestMethod.POST)
	public @ResponseBody int regPfComm(String id, String writer, String writerUid, String content){
		// 포트폴리오 댓글 등록하기
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pfid", id);
		hm.put("pfc_writer", writer);
		hm.put("pfc_writerUid", writerUid);
		hm.put("pfc_content", content);
		return pfRepo.addPfComment(hm);
	}

	@RequestMapping(value="/delPfComment", method=RequestMethod.POST)
	public @ResponseBody int delPfComm(int id){
		return pfRepo.delPfComment(id);
	}

	@RequestMapping(value="/getPfSubComment", method=RequestMethod.POST)
	public @ResponseBody List<pfSubComment> getPfSubComm(String id){
		// 포트폴리오 대댓글 가져오기
		return pfRepo.getAllPfSubComment(id);
	}

	@RequestMapping(value="/regPfSubComment", method=RequestMethod.POST)
	public @ResponseBody int regPfSubComm(String wid, String writer, String writerUid, String content, int id){
		// 포트폴리오 대댓글 등록하기
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pfid", wid);
		hm.put("spfc_writer", writer);
		hm.put("spfc_writerUid", writerUid);
		hm.put("spfc_content", content);
		hm.put("pfc_id", id+"");
		return pfRepo.addPfSubComment(hm);
	}

	@RequestMapping(value="/delPfSubComment", method=RequestMethod.POST)
	public @ResponseBody int delPfSubComm(int id){
		System.out.println(id);
		return pfRepo.delPfSubComment(id);
	}

	/***********포스트 댓글***********/
	/*
	 * 댓글, 대댓글 조회 : getPostComment, getPostSubComment
	 * 댓글, 대댓글 등록 : regPostComment, regPostSubComment
	 * 댓글, 대댓글 삭제 : delPostComment, delPostSubComment
	 */

	@RequestMapping(value="/getPostComment", method=RequestMethod.POST)
	public @ResponseBody List<pfComment> getPostComm(String id){
		// 포스트 댓글 가져오기
		List<pfComment> list = new LinkedList<>();
		List<postComment> q = postRepo.getAllPostComment(id);
		for(int i=0; i<q.size(); i++) {
			postComment n = q.get(i);
			list.add(new pfComment(n.getPc_id(), n.getPid(), n.getPc_writer(), n.getPc_writerUid(), n.getPc_content(), n.getPc_date()));
		}
		return list;
	}

	@RequestMapping(value="/regPostComment", method=RequestMethod.POST)
	public @ResponseBody int regPostComm(String id, String writer, String writerUid, String content){
		// 포스트 댓글 등록하기
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pid", id);
		hm.put("pc_writer", writer);
		hm.put("pc_writerUid", writerUid);
		hm.put("pc_content", content);
		return postRepo.addPostComment(hm);
	}

	@RequestMapping(value="/delPostComment", method=RequestMethod.POST)
	public @ResponseBody int delPostComm(int id){
		System.out.println(id);
		return postRepo.delPostComment(id);
	}

	@RequestMapping(value="/getPostSubComment", method=RequestMethod.POST)
	public @ResponseBody List<pfSubComment> getPostSubComm(String id){
		// 포스트 대댓글 가져오기
		List<pfSubComment> list = new LinkedList<>();
		List<postSubComment> q = postRepo.getAllPostSubComment(id);
		for(int i=0; i<q.size(); i++) {
			postSubComment n = q.get(i);
			list.add(new pfSubComment(n.getSpc_id(), n.getPid(), n.getSpc_writer(), n.getSpc_writerUid(), n.getSpc_content(), n.getSpc_date(), n.getPc_id()));
		}
		return list;
	}

	@RequestMapping(value="/regPostSubComment", method=RequestMethod.POST)
	public @ResponseBody int regPostSubComm(String wid, String writer, String writerUid, String content, int id){
		// 포스트 대댓글 등록하기
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pid", wid);
		hm.put("spc_writer", writer);
		hm.put("spc_writerUid", writerUid);
		hm.put("spc_content", content);
		hm.put("pc_id", id+"");
		return postRepo.addPostSubComment(hm);
	}

	@RequestMapping(value="/delPostSubComment", method=RequestMethod.POST)
	public @ResponseBody int delPostSubComm(int id){
		return postRepo.delPostSubComment(id);
	}


	/***********페이지 이동***********/

	@GetMapping("/portfolio")
	public String goPortfolio(){
		return "forward:/";
	}

	@GetMapping("/post")
	public String goPost(){
		return "forward:/";
	}

	@GetMapping("/git")
	public String goGitPage(){
		return "forward:/";
	}

	@GetMapping("/signup")
	public String goSignUp(){
		return "forward:/";
	}

	@GetMapping("/Management")
	public String goManagement(){
		return "forward:/";
	}

	/***********To do List***********/
	/*
	 * 일정 조회 : getToDoList
	 * 일정 등록 : regToDoList
	 * 일정 수정 : uptTODOList
	 * 일정 삭제 : delToDoList
	 * 카테고리 조회 : getCatList
	 */
	@RequestMapping(value="/getToDoList", method=RequestMethod.GET)
	public @ResponseBody List<userSchedule> getToDoList(String uid){
		 // uid 회원의 일정 목록 가져오기
		return scheRepo.getAllSchedule(uid);
	}
	@RequestMapping(value="/regToDoList", method=RequestMethod.GET)
	public @ResponseBody int regToDoList(String sche_title, String sche_details, String sche_date, String scheCat_id, String uid){
		// uid 회원의 일정 등록하기
		System.out.println(sche_title+" / "+sche_details+" / "+sche_date+" / "+scheCat_id+" / "+uid);
		HashMap<String, String> hm = new HashMap<>();
		hm.put("sche_title", sche_title);
		hm.put("sche_details", sche_details);
		hm.put("sche_date", sche_date);
		hm.put("scheCat_id", scheCat_id);
		hm.put("uid", uid);
		return scheRepo.regToDoList(hm);
	}
	@RequestMapping(value="/delToDoList", method=RequestMethod.GET)
	public @ResponseBody int delToDoList(int sche_id){
	  // uid 회원의 일정 삭제하기
		return scheRepo.deleteScehdule(sche_id);
	}

	
	@RequestMapping(value="/getCatList", method=RequestMethod.GET)
	 public @ResponseBody List<userSchedule> getCatList(String uid){
		 // 카테고리 목록 가져오기
		return scheRepo.getCatList();
	 }
}
