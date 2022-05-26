package com.m12.wwca.application;

import java.util.List;

import javax.transaction.Transactional;

import com.m12.wwca.domain.entity.News;
import com.m12.wwca.domain.repo.NewsRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsService {
    private NewsRepo newsRepo;

    @Autowired
    public NewsService(NewsRepo newsRepo) {
        this.newsRepo = newsRepo;
    }

    @Transactional
    public void addNews(News news) {
        newsRepo.save(news);
    }

    @Transactional
    public News findById(Long id) {
        return newsRepo.findById(id);
    }

    @Transactional
    public void deleteNews(Long id) {
        newsRepo.delete(id);
    }

    @Transactional
    public List<News> findAll() {
        return newsRepo.findAll();
    }


}
