/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m12.wwca.infrastructure.shared.sortedArray.binaryTree;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author roger
 */
public class BinaryTreeFile {
    public BinaryTreeFile(){
        
    }
    public void saveBinaryTree(String path,BinaryTree bt) {
        FileOutputStream fos = null;
        ObjectOutputStream oos = null;
        try {
            File file = new File(path);
            fos = new FileOutputStream(file);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(bt);
        } catch (FileNotFoundException ex) {
            Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                fos.close();
            } catch (IOException ex) {
                Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public BinaryTree readBinaryTree(String path) {
        File file = new File(path);
        if (file.exists()) {
            try {
                FileInputStream fis = new FileInputStream(file);
                ObjectInputStream ois = new ObjectInputStream(fis);
                BinaryTree bt = (BinaryTree) ois.readObject();
                return bt;
            } catch (FileNotFoundException ex) {
                Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(BinaryTree.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }else{
            return null;
        }
        return null;
    }
}
