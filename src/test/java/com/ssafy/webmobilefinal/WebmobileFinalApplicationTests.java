package com.ssafy.webmobilefinal;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ssafy.webmobilefinal.dao.MemberRepository;
import com.ssafy.webmobilefinal.vo.Member;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WebmobileFinalApplicationTests {

	@Autowired
    private MemberRepository repo;

	@Test
	public void contextLoads() {
		List<Member> m = repo.getAllMember();
		System.out.println(m.size());
	}

}
