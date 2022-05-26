package com.m12.wwca.domain.entity;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity(name = "news")
public class News {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String antetitle;
    private String title;
    private String subtitle;
    private String intro;
    private String body;

    @ElementCollection
    private List<ImageUrl> images_url;

    public News() {
    }

    public News(Builder builder){
        this.antetitle = builder.antetitle;
        this.title = builder.title;
        this.subtitle = builder.subtitle;
        this.intro = builder.intro;
        this.body = builder.body;
        this.images_url = builder.images_url;
    }


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAntetitle() {
        return antetitle;
    }
    public void setAntetitle(String antetitle) {
        this.antetitle = antetitle;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getSubtitle() {
        return subtitle;
    }
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }
    public String getIntro() {
        return intro;
    }
    public void setIntro(String intro) {
        this.intro = intro;
    }
    public String getBody() {
        return body;
    }
    public void setBody(String body) {
        this.body = body;
    }
    public List<ImageUrl> getImages_url() {
        return images_url;
    }
    public void setImages_url(List<ImageUrl> images_url) {
        this.images_url = images_url;
    }

    public static class Builder {
        private Long id;
        private String antetitle;
        private String title;
        private String subtitle;
        private String intro;
        private String body;
        private List<ImageUrl> images_url;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }
        public Builder antetitle(String antetitle) {
            this.antetitle = antetitle;
            return this;
        }
        public Builder title(String title) {
            this.title = title;
            return this;
        }
        public Builder subtitle(String subtitle) {
            this.subtitle = subtitle;
            return this;
        }
        public Builder intro(String intro) {
            this.intro = intro;
            return this;
        }
        public Builder body(String body) {
            this.body = body;
            return this;
        }
        public Builder images_url(List<ImageUrl> images_url) {
            this.images_url = images_url;
            return this;
        }

        public News build() {
            return new News(this);
        }
    }

    
}
