/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m12.wwca.infrastructure.shared.sortedArray.binaryTree;

import java.io.Serializable;

import com.m12.wwca.infrastructure.shared.sortedArray.CompareSizes;


/**
 *
 * @author roger
 */
public class Node implements Serializable{
    private Node parent;
    private Node left;
    private Node right;
    private CompareSizes key;
    private boolean active = true;
//    private boolean disableLeft = true;
//    private boolean disableRight = true;
    
    public Node(CompareSizes key,Node parent){
        this.key = key;
        this.parent = parent;
    }
    public Node(CompareSizes key) {
        this.key = key;
    }

    public Node getLeft() {
        return left;
    }

    public void setLeft(Node left) {
        this.left = left;
//        disableLeft = false;
    }

    public Node getRight() {
        return right;
    }

    public void setRight(Node right) {
        this.right = right;
//        disableRight = false;
    }

    public CompareSizes getKey() {
        return key;
    }

    public void setKey(CompareSizes key) {
        this.key = key;
    }

    public Node getParent() {
        return parent;
    }

    public void setParent(Node parent) {
        this.parent = parent;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    
    
//    public boolean isDisableLeft() {
//        return disableLeft;
//    }
//
//    public void setDisableLeft(boolean disableLeft) {
//        this.disableLeft = disableLeft;
//    }
//
//    public boolean isDisableRight() {
//        return disableRight;
//    }
//
//    public void setDisableRight(boolean disableRight) {
//        this.disableRight = disableRight;
//    }

    @Override
    public String toString() {
        return key + " : {" + "\nleft=" + left + ",\nright=" + right + "}";
    }
    
}
