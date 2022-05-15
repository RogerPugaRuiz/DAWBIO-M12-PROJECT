package com.m12.wwca.domain.entity;

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
@Entity(name = "roles")
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Role other = (Role) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        return true;
    }
}
