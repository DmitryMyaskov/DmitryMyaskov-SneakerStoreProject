package com.example.SneakerStore.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name="color")

public class Color implements Serializable {

    private static final long serialVersionUID = 1L;

    public Color() {
    }

    public Color(Integer colorId, String name) {
        this.colorId = colorId;
        this.name = name;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }

    @Id
    @Column(name="color_id")
    private Integer colorId;

    @Column(name = "name")
    private String name;




    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Color{" +
                "colorId=" + colorId +
                ", name='" + name + '\'' +
                '}';
    }

}
