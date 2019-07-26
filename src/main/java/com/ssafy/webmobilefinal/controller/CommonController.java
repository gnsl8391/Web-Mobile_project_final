package com.ssafy.webmobilefinal.controller;

import java.util.List;

import com.ssafy.webmobilefinal.dao.MemberRepository;
import com.ssafy.webmobilefinal.vo.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CommonController {
	@Autowired
    private MemberRepository repo;

	@GetMapping("/go")
	public @ResponseBody int getPort() {
		List<Member> m = repo.getAllMember();

		return m.size();
	}

	@RequestMapping(value="/PortfolioDetail", method=RequestMethod.POST)
	public ModelAndView getpf(String portfolioUrl){
		System.out.println("!!!************************************************!!!!!!!!!!");
		System.out.println(portfolioUrl);
		ModelAndView mav= new ModelAndView();
		mav.setViewName("PortfolioDetail"); // 이거 안됨
		return mav;
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
