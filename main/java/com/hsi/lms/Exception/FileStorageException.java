package com.hsi.lms.Exception;

public class FileStorageException extends RuntimeException{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1269472629678996449L;

	public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
