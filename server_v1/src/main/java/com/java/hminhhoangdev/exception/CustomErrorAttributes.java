package com.java.hminhhoangdev.exception;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class CustomErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        //remove TRACE
        options = options.excluding(ErrorAttributeOptions.Include.STACK_TRACE);
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
        return errorAttributes;
    }
}
