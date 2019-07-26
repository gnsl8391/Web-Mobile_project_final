package com.ssafy.webmobilefinal.controller;

import java.util.List;

import com.ssafy.webmobilefinal.dao.MemberRepository;
import com.ssafy.webmobilefinal.vo.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonController {
	@Autowired
    private MemberRepository repo;

	@GetMapping("/go")
	public @ResponseBody int getPort() {
		List<Member> m = repo.getAllMember();
		
		return m.size();
	}

	
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
}
