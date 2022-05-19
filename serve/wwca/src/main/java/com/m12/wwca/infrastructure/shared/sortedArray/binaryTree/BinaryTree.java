/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.m12.wwca.infrastructure.shared.sortedArray.binaryTree;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.m12.wwca.infrastructure.shared.sortedArray.CompareSizes;
import com.m12.wwca.infrastructure.shared.sortedArray.SortedArray;

/**
 *
 * @author roger
 */
public class BinaryTree implements Serializable{

    private Node root;
    private int total;

    public BinaryTree(SortedArray sorted) {
        insertNodes(sorted);
        total = sorted.size();
    }
    public BinaryTree(){
        
    }

    public Node getRoot() {
        return root;
    }

    private void insertNodes(SortedArray sorted) {
        root = new Node(sorted.get(0));
        Node lastNode = root;
        int i = 1;
        while (i < sorted.size()) {
            final CompareSizes value = sorted.get(i);
            if (!value.isGreater(lastNode.getKey())) {
                if (lastNode.getLeft() == null) {
                    lastNode.setLeft(new Node(value, lastNode));
                    lastNode = root;
                    i++;
                } else {
                    lastNode = lastNode.getLeft();
                }

            } else if (!(lastNode.getKey().getValue() == value.getValue())) {
                if (lastNode.getRight() == null) {
                    lastNode.setRight(new Node(value, lastNode));
                    lastNode = root;
                    i++;
                } else {
                    lastNode = lastNode.getRight();
                }

            } else {
                i++;
            }

        }
    }

    /**
     * to go through the tree in order first we check that it does not have any
     * node on the left and add to the list, we also add the key of the parent
     * and check the same in the one on the right
     * @return SortedArray
     */
    public SortedArray inorder() {
        Node lastNode = root;
        SortedArray list = new SortedArray();

        while (list.size() < total) {
            if (lastNode.getLeft() != null && lastNode.getLeft().isActive()){
                lastNode = lastNode.getLeft();
            } else {
                if (lastNode.isActive()){
                    list.add(lastNode.getKey());
                    lastNode.setActive(false);
                }

                if (lastNode.getRight() != null && lastNode.getRight().isActive()){
                    lastNode = lastNode.getRight();
                }else{
                    lastNode = lastNode.getParent();      
                }
            }
        }
        return list;
    }
    
    public CompareSizes findOne(CompareSizes other){
        Node lastNode = root;
        while (true) {
            if (lastNode.getKey().isGreater(other)){    
                if (lastNode.getLeft() == null){
                    return lastNode.getKey();
                } else {
                    lastNode = lastNode.getLeft();
                }
            }else if (lastNode.getKey().getValue() == other.getValue()){
                return lastNode.getKey();
            }else{
                if (lastNode.getRight() == null){
                    return lastNode.getKey();
                } else {
                    lastNode = lastNode.getRight();
                }
            }
        }
    }
    
    public BinaryTree findAll(CompareSizes other){
        BinaryTree bt = null;
        return bt;
    }

}
