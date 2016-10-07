package org.openhs.core.remote.access;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.getWriter().print("<html><body>" +
                "<h3>Hello Servlet</h3>" +
                "<form name=\"input\" method=\"post\">\n" +
                "Hello value: <input type=\"text\" name=\"helloValue\">\n" +
                "<input type=\"submit\" value=\"Submit\">\n" +
                "");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String value = request.getParameter("helloValue");
        System.out.println("doPost,helloValue=" + value);
       // response.setContentType("text/html");
       // response.getWriter().print("<html><body>helloValue=" + value + "</body></html>");
        
        response.getWriter().print("<html><body>" +
                "<h3>Hello Servlet</h3>" +
                "<form name=\"input\" method=\"post\">\n" +
                "Hello value: <input type=\"text\" name=\"helloValue\">\n" +
                "<input type=\"submit\" value=\"Submit\">\n" +
                "");       
        
        response.getWriter().print("<html><body>helloValue=" + value + "</body></html>");
    }
    
}
