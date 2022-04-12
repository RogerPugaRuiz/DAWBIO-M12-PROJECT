package com.m12.wwca.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.List;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id; // id for hibernate

    @Column(nullable = false, unique = true)
    private String name; // name of the role

    // @OneToMany(targetEntity = AppUser.class)
    // private List<AppUser> users;

    /**
     * Default constructor
     */
    public Role() {
    }

    /**
     * Constructor with parameters
     *
     * @param name
     */
    public Role(String name){
        this.name = name;
    }


    /**
     * Getter for the id
     *
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter for the id
     *
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for the name
     *
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for the name
     *
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    // public List<AppUser> getUsers() {
    //     return users;
    // }

    @Override
    /**
     * Override toString method
     */
    public String toString() {
        return this.name;
    }

    
    
}
