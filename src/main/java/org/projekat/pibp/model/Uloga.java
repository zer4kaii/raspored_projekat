package org.projekat.pibp.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
@Table(name="uloge")
public class Uloga {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String naziv;
}
