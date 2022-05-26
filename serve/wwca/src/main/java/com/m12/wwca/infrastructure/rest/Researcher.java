package com.m12.wwca.infrastructure.rest;

import com.m12.wwca.application.NewsService;
import com.m12.wwca.domain.entity.News;

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
public class Researcher {
    
    @Autowired
    private NewsService newsService;

    @PostMapping("/news/add")
    public ResponseEntity addNew(@RequestBody News news) {
        newsService.addNews(news);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/news/delete")
    public ResponseEntity deleteNew(@RequestParam Long id) {
        newsService.deleteNews(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/news/find")
    public ResponseEntity findNew(@RequestParam Long id) {
        News news = newsService.findById(id);
        return new ResponseEntity(news, HttpStatus.OK);
    }

    @GetMapping("/news/findall")
    public ResponseEntity findAll() {
        Iterable<News> news = newsService.findAll();
        return new ResponseEntity(news, HttpStatus.OK);
    }

}
