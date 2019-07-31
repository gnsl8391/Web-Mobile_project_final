package com.ssafy.webmobilefinal.controller;

import java.util.HashMap;
import java.util.List;

import com.ssafy.webmobilefinal.dao.MemberRepository;
import com.ssafy.webmobilefinal.dao.PortfolioRepository;
import com.ssafy.webmobilefinal.vo.Member;
import com.ssafy.webmobilefinal.vo.PfComment;
import com.ssafy.webmobilefinal.vo.PfSubComment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {
	@Autowired
    private MemberRepository repo;

	@Autowired
    private PortfolioRepository pfRepo;

	@GetMapping("/go")
	public int getPort() {
		List<Member> m = repo.getAllMember();

		return m.size();
	}

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

	@RequestMapping(value="/getPfComment", method=RequestMethod.POST)
	public List<PfComment> getPfComm(String pfid){
		// 포트폴리오 댓글 가져오기
		return pfRepo.getAllPfComment(pfid);
	}
	
	@RequestMapping(value="/regPfComment", method=RequestMethod.POST)
	public int regPfComm(String pfid, String pfc_writer, String pfc_writerUid, String pfc_content){
		// 포트폴리오 댓글 등록하기
		System.out.println(pfid+"/"+pfc_writer+"/"+pfc_writerUid+"/"+pfc_content);
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pfid", pfid);
		hm.put("pfc_writer", pfc_writer);
		hm.put("pfc_writerUid", pfc_writerUid);
		hm.put("pfc_content", pfc_content);
		return pfRepo.addPfComment(hm);
	}
	
	@RequestMapping(value="/delPfComment", method=RequestMethod.POST)
	public int delPfComm(int pfc_id){
		System.out.println(pfc_id);
		return pfRepo.delPfComment(pfc_id);
	}
	
	@RequestMapping(value="/getPfSubComment", method=RequestMethod.POST)
	public List<PfSubComment> getPfSubComm(String pfc_id){
		// 포트폴리오 대댓글 가져오기
		System.out.println(pfc_id);
		List<PfSubComment> list = pfRepo.getAllPfSubComment(pfc_id);
		for(int i=0; i<list.size(); i++) {
			System.out.println(list.get(i));
		}
		return pfRepo.getAllPfSubComment(pfc_id);
	}
	
	@RequestMapping(value="/regPfSubComment", method=RequestMethod.POST)
	public int regPfSubComm(String pfid, String spfc_writer, String spfc_writerUid, String spfc_content, int pfc_id){
		// 포트폴리오 대댓글 등록하기
		System.out.println(pfid+"/"+spfc_writer+"/"+spfc_writerUid+"/"+spfc_content+"/"+pfc_id);
		HashMap<String, String> hm = new HashMap<>();
		hm.put("pfid", pfid);
		hm.put("spfc_writer", spfc_writer);
		hm.put("spfc_writerUid", spfc_writerUid);
		hm.put("spfc_content", spfc_content);
		hm.put("pfc_id", pfc_id+"");
		return pfRepo.addPfSubComment(hm);
	}
	
	@RequestMapping(value="/delPfSubComment", method=RequestMethod.POST)
	public int delPfSubComm(int spfc_id){
		System.out.println(spfc_id);
		return pfRepo.delPfSubComment(spfc_id);
	}

//	@GetMapping("/portfolio")
//	public String goPortfolio(){
//		return "forward:/";
//	}
//
//	@GetMapping("/post")
//	public String goPost(){
//		return "forward:/";
//	}
//
//	@GetMapping("/git")
//	public String goGitPage(){
//
//		return "forward:/";
//	}
//
//	@GetMapping("/signup")
//	public String goSignUp(){
//		return "forward:/";
//	}
}
