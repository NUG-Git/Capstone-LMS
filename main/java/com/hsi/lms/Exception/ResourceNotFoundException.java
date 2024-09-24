package com.hsi.lms.Exception;

//@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	
	private static final long serialVersionUID = -1508325991304127127L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}
