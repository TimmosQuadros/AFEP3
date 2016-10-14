/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import entity.Car;
import entity.exceptions.NonexistentEntityException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author TimmosQuadros
 */
public class Facade {
    CarJpaController cjpa;

    public Facade() {
        cjpa = new CarJpaController(Persistence.createEntityManagerFactory("pu"));
    }
    
    public List<Car> getCars(){
        return cjpa.findCarEntities();
    }
    
    public void addCar(Car car) throws Exception{
        cjpa.create(car);
    }
    
    public void deleteCar(int id) throws NonexistentEntityException{
        cjpa.destroy(id);
    }
    
    public void editCar(Car car) throws Exception{
        cjpa.edit(car);
    }
    
}
