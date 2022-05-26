package com.m12.wwca.domain.entity;

import javax.persistence.Embeddable;

@Embeddable
public class ImageUrl {
    private String url;

    public ImageUrl() {
    }

    public ImageUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
