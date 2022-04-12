package com.m12.wwca.infrastructure.mapper;


import java.util.List;

import com.m12.wwca.infrastructure.mapper.exception.InvalidMapperException;

/**
 * @author Roger Puga Ruiz
 * @version 1.0
 * @since 11/04/2022
 */
public interface Mapper {
    /**
     * Map the source object to the target object
     * @param targetClass
     * @param source
     * @return Object of the targetClass
     * @throws InvalidMapperException
     */
    public Object map(Class<?> clazz, Object source) throws InvalidMapperException;
}
