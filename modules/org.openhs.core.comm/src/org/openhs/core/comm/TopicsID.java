package org.openhs.core.comm;

public enum TopicsID {

	OPENHS("openhs"),
	TEMP("temp");
	
    private String value;

    TopicsID(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.getValue();
    }	
	
}
