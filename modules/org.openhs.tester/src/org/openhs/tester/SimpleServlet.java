package org.openhs.tester;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class SimpleServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;
  
  int  i = 5;

  protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
    throws ServletException, IOException {
    resp.setContentType("text/plain");
    resp.setHeader("Refresh", "10");
    resp.getWriter().write("Hello OpenHS!!!");
    i ++;
    resp.getWriter().write("\nNumber of refreshes: " + i);
    resp.getWriter().write("\nDate: " + i + new Date().toString());

  }
}