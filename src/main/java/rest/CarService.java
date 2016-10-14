/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Car;
import entity.Facade;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author TimmosQuadros
 */
@Path("car")
public class CarService {
    
    Facade fac = new Facade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CarService
     */
    public CarService() {
    }

    /**
     * Retrieves representation of an instance of rest.CarService
     * @return an instance of java.lang.String
     */
    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCarsJSON() {
        List<Car> cars = fac.getCars();
        return gson.toJson(cars);
    }

    /**
     * PUT method for updating or creating an instance of CarService
     * @param content representation for the resource
     * @throws java.lang.Exception
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putCarJSON(String content) throws Exception {
        Car car = gson.fromJson(content, Car.class);
        fac.editCar(car);
    }
    
    /**
     * PUT method for updating or creating an instance of CarService
     * @param content representation for the resource
     * @throws java.lang.Exception
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void postCarJSON(String content) throws Exception {
        Car car = gson.fromJson(content, Car.class);
        fac.addCar(car);
    }
    
    /**
     * PUT method for updating or creating an instance of CarService
     * @param id
     * @throws java.lang.Exception
     */
    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public void deleteCarJSON(@PathParam("id") int id) throws Exception {
       fac.deleteCar(id);
    }
}
