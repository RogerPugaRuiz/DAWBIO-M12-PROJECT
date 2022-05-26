package com.m12.wwca.infrastructure.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.m12.wwca.application.NewsService;
import com.m12.wwca.application.UserService;
import com.m12.wwca.domain.entity.News;
import com.m12.wwca.infrastructure.shared.Status;
import com.m12.wwca.infrastructure.shared.jwt.UserJWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/researcher")
public class ResearcherApi {

    @Autowired
    private NewsService newsService;
    @Autowired
    private UserService userService;

    @PostMapping("/news/add")
    public ResponseEntity addNew(@RequestBody News news, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if (UserJWT.validate(jwt)) {
            newsService.addNews(news);
            Status status = new Status(true, "News added");
            return ResponseEntity.status(HttpStatus.OK).body(status);
        } else {
            Status status = new Status(false, "Invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(status);
        }
    }

    @GetMapping("/news/delete")
    public ResponseEntity deleteNew(@RequestParam Long id, HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if (UserJWT.validate(jwt)) {
            newsService.deleteNews(id);
            Status status = new Status(true, "News deleted");
            return ResponseEntity.ok(status);
        } else {
            Status status = new Status(false, "Invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(status);
        }
    }

    @GetMapping("/news/find")
    public ResponseEntity findNew(@RequestParam Long id) {
        News news = newsService.findById(id);
        Status status = new Status(true, "News found");
        Map<Object, Object> data = new HashMap<>();
        data.put("news", news);
        status.setData(data);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/news/findall")
    public ResponseEntity findAll() {
        List<News> news = newsService.findAll();
        Status status = new Status(true, "Success");
        Map<Object, Object> data = new HashMap<>();
        data.put("news", news);
        status.setData(data);

        return ResponseEntity.ok(status);
    }

}
