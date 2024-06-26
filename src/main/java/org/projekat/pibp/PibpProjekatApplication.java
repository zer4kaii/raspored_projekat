package org.projekat.pibp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@SpringBootApplication
public class PibpProjekatApplication implements CommandLineRunner {

    private DataSource dataSource;

    public static void main(String[] args) {
        SpringApplication.run(PibpProjekatApplication.class, args);
    }

    @Autowired
    public void DatabaseReader(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        Connection conn = dataSource.getConnection();


        System.out.println("///////////////////////////////////////////////////");
        PreparedStatement stmt = conn.prepareStatement("SELECT naziv_predmeta FROM PREDMETI WHERE broj_studenata>100");
        ResultSet rslt = stmt.executeQuery();
        while (rslt.next()) {
            System.out.println(rslt.getString(1));
        }
        System.out.println("///////////////////////////////////////////////////");
    }
}

