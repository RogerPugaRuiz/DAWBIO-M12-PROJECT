package com.m12.wwca.domain.repo;

import java.util.List;

import com.m12.wwca.domain.entity.News;

public interface NewsRepo {
    public void save(News news);
    public News findById(Long id);
    public void delete(Long id);
    public List<News> findAll();
    // public void deleteAll();
    
}
