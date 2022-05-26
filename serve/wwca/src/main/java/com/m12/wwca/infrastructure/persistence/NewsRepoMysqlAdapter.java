package com.m12.wwca.infrastructure.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.m12.wwca.domain.entity.News;
import com.m12.wwca.domain.repo.NewsRepo;

import org.springframework.stereotype.Repository;

@Repository
public class NewsRepoMysqlAdapter implements NewsRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(News news) {
        // message.setId(1L);
        entityManager.persist(news);
    }

    @Override
    public News findById(Long id) {
        News auxNews = entityManager.createQuery("SELECT n FROM news n WHERE n.id = :id", News.class)
                .setParameter("id", id)
                .getSingleResult();
        return auxNews;
    }

    

    @Override
    public void delete(Long id) {
        News news = findById(id);
        entityManager.remove(news);
    }

    @Override
    public List<News> findAll() {
        List<News> news = entityManager.createQuery("SELECT n FROM news n", News.class).getResultList();
        return news;
    }
    
}
