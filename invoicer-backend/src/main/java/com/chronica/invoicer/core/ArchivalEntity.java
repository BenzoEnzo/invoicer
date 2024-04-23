package com.chronica.invoicer.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class ArchivalEntity<T extends BaseEntity> {
    private T realEntity;
    private Date createdAt;
    private Integer version;
}
